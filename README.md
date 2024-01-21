# Papyrus: AI-Powered Conversations with Your PDFs

Papyrus is an open-source SaaS platform leveraging AI for interactive PDF conversations. Built with Next.js 14, it showcases modern SaaS development using open-source technologies.

![Project Image](https://github.com/dimitri-t/papyrus/blob/main/public/thumbnail.png)

## Features

- **Next.js 14**, featuring **`/app`** dir & **turborepo**
- UI Components built using **Radix UI, shadcn & TailwindCSS**
- **NextAuth.js** authentication
- ORM - **Prisma**
- Database - **PlanetScale**
- File storage - **Uploadthing**
- Subscriptions - **Stripe**
- E2E Typesafe API - **tRPC & Zod**
- Vector DB - **Pinecone**
- Real-Time streaming API Responses
- Optimistic UI updates
- LangChain for Infinite AI Memory, along with **OpenAI**
- Written in **TypeScript**

## Features to develop

- [ ] Set up logging software
- [ ] Fix issue with Vercel serverless functions timing out after 10 secs

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
