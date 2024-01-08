import ChatWrapper from '@/components/chat/chat-wrapper';
import PdfRenderer from '@/components/pdf-renderer';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { getUserSubscriptionPlan } from '@/lib/subscription';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: {
    fileid: string;
  };
}
const File = async ({ params }: PageProps) => {
  const { fileid } = params;

  const user = await getCurrentUser();
  const { isSubscribed } = await getUserSubscriptionPlan();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="max-w-8xl mx-auto w-full grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-2 py-3 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url} />
          </div>
        </div>

        <div className="flex-[0.75] shrink-0 border border-gray-200 lg:w-96">
          <ChatWrapper isSubscribed={isSubscribed} fileId={file.id} />
        </div>
      </div>
    </div>
  );
};

export default File;
