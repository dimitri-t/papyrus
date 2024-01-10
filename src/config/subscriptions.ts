import { env } from '@/env';

export const PLANS = [
  {
    name: 'Free',
    slug: 'free',
    quota: 10,
    pagesPerPdf: 25,
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    quota: 50,
    pagesPerPdf: 500,
    price: {
      amount: 10,
      priceIds: {
        test: env.STRIPE_PRO_MONTHLY_PLAN_ID,
        production: '',
      },
    },
  },
];
