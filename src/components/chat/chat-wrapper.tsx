"use client";

import Messages from "./messages";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import ChatInput from "./chat-input";
import { api } from "@/trpc/react";
import { PLANS } from "@/config/stripe";
import { buttonVariants } from "../ui/button";
import { ChatContextProvider } from "./chat-context";

interface ChatWrapperProps {
  fileId: string;
  isSubscribed: boolean;
}

const ChatWrapper = ({ fileId, isSubscribed }: ChatWrapperProps) => {
  const { data, isLoading } = api.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    },
  );

  if (isLoading)
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <h3 className="text-xl font-semibold">Loading...</h3>
            <p className="text-sm text-zinc-500">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  if (data?.status === "PROCESSING")
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <h3 className="text-xl font-semibold">Processing PDF...</h3>
            <p className="text-sm text-zinc-500">This won&apos;t take long.</p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="text-xl font-semibold">Too many pages in PDF</h3>
            <p className="text-sm text-zinc-500">
              Your{" "}
              <span className="font-medium">
                {isSubscribed ? "Pro" : "Free"}
              </span>{" "}
              plan supports up to{" "}
              {isSubscribed
                ? PLANS.find((p) => p.name === "Pro")?.pagesPerPdf
                : PLANS.find((p) => p.name === "Free")?.pagesPerPdf}{" "}
              pages per PDF.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <ChevronLeft className="mr-1.5 h-3 w-3" />
              Back
            </Link>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  return (
    <ChatContextProvider fileId={fileId}>
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col justify-between">
          <Messages fileId={fileId} />
        </div>

        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
