import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 py-16 md:py-48 xl:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-24 text-center md:gap-32 xl:gap-12">
          <div className="flex flex-col gap-12">
            <p className="-mb-12 font-medium sm:text-xl">
              Chat with your PDF documents
            </p>
            <h1 className="font-heading text-5xl md:text-8xl xl:text-9xl">
              Your trusted companion
            </h1>
          </div>
          <div className="flex max-w-64 flex-col gap-4">
            <div>
              <Link
                href="/login"
                className={cn(buttonVariants({ size: 'lg' }))}
              >
                Start for free
              </Link>
            </div>
            <p className="md:text-md max-w-[42rem] text-xs font-medium leading-normal">
              Papyrus is an open source project.{' '}
              <span>
                View the source code on{' '}
                <span className="underline">GitHub</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="container space-y-6 py-32 dark:bg-transparent md:py-12">
        <div className="shadow-outer mx-auto max-w-6xl rounded-sm shadow-2xl shadow-primary">
          <Image
            src="/papyrus-demo.png"
            alt="product preview"
            width={1345}
            height={858}
            quality={100}
            className="rounded-sm border-primary"
          />
        </div>
      </section>

      <section className="container space-y-6 dark:bg-transparent">
        <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
                Start chatting in minutes
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Chatting to your PDF files has never been easier than with
                Quill.
              </p>
            </div>
          </div>

          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-xl font-semibold">
                  Sign up for an account
                </span>
                <span className="mt-2 text-zinc-700">
                  Either starting out with a free plan or choose our{' '}
                  <Link
                    href="/pricing"
                    className="text-blue-700 underline underline-offset-2"
                  >
                    pro plan
                  </Link>
                  .
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-xl font-semibold">
                  Upload your PDF file
                </span>
                <span className="mt-2 text-zinc-700">
                  We&apos;ll process your file and make it ready for you to chat
                  with.
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-xl font-semibold">
                  Start asking questions
                </span>
                <span className="mt-2 text-zinc-700">
                  It&apos;s that simple. Try out Quill today - it really takes
                  less than a minute.
                </span>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="space-y-6 py-16 md:py-48 xl:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-24 text-center md:gap-32 xl:gap-12">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl md:text-6xl xl:text-8xl">
              Get started for free
            </h2>
            <p className="font-medium sm:text-xl">
              Upload your files and let Papyrus do the work
            </p>
          </div>
          <div className="flex max-w-64 flex-col gap-4">
            <div>
              <Link
                href="/login"
                className={cn(buttonVariants({ size: 'lg' }))}
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
