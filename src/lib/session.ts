import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export const getServerAuthSession = () => getServerSession(authOptions);

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
