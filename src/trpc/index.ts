import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from './trpc';
import { db } from '@/lib/db';
import { TRPCError } from '@trpc/server';
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query';
import { absoluteUrl } from '@/lib/utils';
import { stripe } from '@/lib/stripe';
import { PLANS } from '@/config/subscriptions';
import { getUserSubscriptionPlan } from '@/lib/subscription';

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

      if (!file) return { status: 'PENDING' as const };

      // Check to see if the user has subscribed since uploading a file
      const userSubscription = await getUserSubscriptionPlan();

      if (userSubscription.isSubscribed) {
        await db.file.update({
          where: {
            id: input.fileId,
            userId: ctx.session.user.id,
          },
          data: {
            uploadStatus: 'SUCCESS',
          },
        });

        return {
          status: 'SUCCESS',
        };
      } else {
        return {
          status: userSubscription.isSubscribed ? 'SUCCESS' : file.uploadStatus,
        };
      }
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

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

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

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

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
      })
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

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          fileId,
        },
        orderBy: {
          createdAt: 'desc',
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

  createStripeSession: protectedProcedure.mutation(async ({ ctx }) => {
    const { session } = ctx;
    const userId = session.user.id;

    const billingUrl = absoluteUrl('/dashboard/billing');
    console.log({ session, billingUrl });

    if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const dbUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!dbUser) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const subscriptionPlan = await getUserSubscriptionPlan();

    if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId,
        return_url: billingUrl,
      });

      return { url: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      line_items: [
        {
          price: PLANS.find((plan) => plan.name === 'Pro')?.price.priceIds.test,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
    });

    return { url: stripeSession.url };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
