import { Pinecone } from '@pinecone-database/pinecone';

import { env } from '@/env';

export const pinecone = new Pinecone({
  apiKey: env.PINECONE_API_KEY!,
  environment: 'gcp-starter',
});
