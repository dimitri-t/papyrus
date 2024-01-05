import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env";
import { db } from "@/lib/db";

// Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
// object and keep type safety.
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

//  Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};

// HELPER FUNCTIONS
export const getServerAuthSession = () => getServerSession(authOptions);

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
