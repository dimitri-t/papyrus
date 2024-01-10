import { DashboardHeader } from '@/components/dashboard-header';
import { FileItem } from '@/components/file-item';
import { DashboardShell } from '@/components/shell';
import FileUploadButton from '@/components/upload-button';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="PDFs" text="Create and manage your PDF files.">
        <FileUploadButton isSubscribed={false} />
      </DashboardHeader>
      <div className="divide-y divide-border rounded-md border">
        <FileItem.Skeleton />
        <FileItem.Skeleton />
        <FileItem.Skeleton />
        <FileItem.Skeleton />
        <FileItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
