import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";

export const exampleRouter = createTRPCRouter({
  testPublicRoute: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  testProtectedRoute: protectedProcedure.query(async ({ ctx }) => {
    const dbUser = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!dbUser) throw new TRPCError({ code: "NOT_FOUND" });

    return `UserName: ${dbUser.name}`;
  }),
});
