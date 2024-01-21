import { getServerAuthSession } from '@/lib/session';
import { db } from '@/lib/db';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { pinecone } from '@/lib/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { env } from '@/env';
import { getUserSubscriptionPlan } from '@/lib/subscription';
import { PLANS } from '@/config/subscriptions';

const f = createUploadthing();

const middleware = async () => {
  const session = await getServerAuthSession();

  if (!session || !session.user || !session.user.id)
    throw new Error('Unauthorized');

  const subscriptionPlan = await getUserSubscriptionPlan();

  return { subscriptionPlan, userId: session.user.id };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  console.log('START');
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      uploadStatus: 'PROCESSING',
    },
  });

  console.log('CREATED FILE', createdFile);

  try {
    console.log('FETCHING START');

    const response = await fetch(
      `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
    );

    console.log('RESPONSE', response);

    const blob = await response.blob();

    const loader = new PDFLoader(blob);

    const pageLevelDocs = await loader.load();

    const pagesAmt = pageLevelDocs.length;

    const { subscriptionPlan } = metadata;

    const { isSubscribed } = subscriptionPlan;

    console.log('AFTER');

    const isProExceeded =
      pagesAmt > PLANS.find((plan) => plan.name === 'Pro')!.pagesPerPdf;
    const isFreeExceeded =
      pagesAmt > PLANS.find((plan) => plan.name === 'Free')!.pagesPerPdf;

    // vectorize and index entire document
    const pineconeIndex = pinecone.Index('papyrus');

    console.log('INDEXING', pineconeIndex);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: env.OPENAI_API_KEY,
    });

    console.log('EMBEDDINGS', embeddings);

    await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      namespace: createdFile.id,
    });

    console.log('EMBEDDINGS AFTER');

    if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
      console.log('FAILED');

      await db.file.update({
        data: {
          uploadStatus: 'FAILED',
        },
        where: {
          id: createdFile.id,
        },
      });
    } else {
      console.log('SUCCESS');

      await db.file.update({
        data: { uploadStatus: 'SUCCESS' },
        where: { id: createdFile.id },
      });
    }
  } catch (error) {
    console.log('FAILED 2');
    await db.file.update({
      data: { uploadStatus: 'FAILED' },
      where: { id: createdFile.id },
    });
  }
};

export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
