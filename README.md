# Papyrus: AI-Powered Conversations with Your PDFs

Papyrus is an open-source SaaS platform leveraging AI for interactive PDF conversations. Built with Next.js 14, it showcases modern SaaS development using open-source technologies.

**This project is an experiment and not production ready. Feel free to fork and play around with it!**

![Project Image](https://github.com/dimitri-t/papyrus/blob/main/public/thumbnail.png)

## Features

- Complete & functional SaaS
- **Next.js 14**, featuring **`/app`** dir & **turborepo**
- Real-Time streaming API Responses
- UI Components built using **Radix UI, shadcn & TailwindCSS**
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **PlanetScale**
- Subscriptions using **Stripe**
- Vector DB using **Pinecone**
- E2E Typesafe API using **tRPC & Zod**
- LangChain for Infinite AI Memory, along with **OpenAI**
- Written in **TypeScript**

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
```
