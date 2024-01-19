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
