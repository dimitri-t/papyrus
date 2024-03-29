import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { db } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard-header';
import { FileItem } from '@/components/file-item';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import FileUploadButton from '@/components/upload-button';
import { getUserSubscriptionPlan } from '@/lib/subscription';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const subscriptionPlan = await getUserSubscriptionPlan();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const files = await db.file.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="PDFs" text="Create and manage your PDF files.">
        <FileUploadButton isSubscribed={subscriptionPlan.isSubscribed} />
      </DashboardHeader>
      <div>
        {files?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {files.map((file) => (
              <FileItem key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No PDF files</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any PDF files yet. Start creating content.
            </EmptyPlaceholder.Description>
            <FileUploadButton isSubscribed={subscriptionPlan.isSubscribed} />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
