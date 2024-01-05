import PdfRenderer from "@/components/pdf-renderer";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    fileid: string;
  };
}
const File = async ({ params }: PageProps) => {
  const { fileid } = params;

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div>
      <PdfRenderer url={file.url} />

      <>sausage</>
    </div>
  );
};

export default File;
