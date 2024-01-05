import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "./trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";

export const appRouter = createTRPCRouter({
  getUserFiles: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    return await db.file.findMany({
      where: {
        userId: session.user.id,
      },
    });
  }),

  getFileUploadStatus: protectedProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.session.user.id,
        },
      });

      if (!file) return { status: "PENDING" as const };

      return { status: file.uploadStatus };
    }),

  getFile: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId: session.user.id,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),

  deleteFile: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId: session.user.id,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.file.delete({
        where: {
          id: input.id,
        },
      });

      return file;
    }),

  getFileMessages: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { session } = ctx;
      const userId = session.user.id;
      const { fileId, cursor } = input;
      const limit = input.limit ?? INFINITE_QUERY_LIMIT;

      const file = await db.file.findFirst({
        where: {
          id: fileId,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          fileId,
        },
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          isUserMessage: true,
          createdAt: true,
          text: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem?.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
