# Papyrus

Papyrus is an open source SaaS platform build on Next.js 14. The application enables users to chat with their PDF files using the power of AI.

This project has been built to see how a modern SaaS platform can be developed on modern open source technologies.

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
