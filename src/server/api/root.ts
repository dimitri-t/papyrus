import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "./trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const appRouter = createTRPCRouter({
  getFile: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      const user = session.user;

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId: user.id,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
