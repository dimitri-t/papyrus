# Papyrus: AI-Powered Conversations with Your PDFs

Papyrus is an open-source SaaS platform leveraging AI for interactive PDF conversations. Built with Next.js 14, it showcases modern SaaS development using open-source technologies.

**This project is an experiment and not production ready. Feel free to fork and play around with it!**

![Project Image](https://github.com/dimitri-t/papyrus/blob/main/public/thumbnail.png)

## Features

- Complete & functional SaaS
- **Next.js 14**, featuring **`/app`** dir & **turborepo**
- UI Components built using **Radix UI, shadcn & TailwindCSS**
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **PlanetScale**
- File storage on **Uploadthing**
- Subscriptions using **Stripe**
- E2E Typesafe API using **tRPC & Zod**
- Vector DB using **Pinecone**
- Real-Time streaming API Responses
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
