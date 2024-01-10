import Link from 'next/link';
import { File } from '@prisma/client';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface FileItemProps {
  file: Pick<File, 'id' | 'name' | 'createdAt'>;
}

export function FileItem({ file }: FileItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/file/${file.id}`}
          className="font-semibold hover:underline"
        >
          {file.name}
        </Link>
        <div>
          <p className="text-muted-foreground text-sm">
            {formatDate(file.createdAt?.toDateString())}
          </p>
        </div>
      </div>
    </div>
  );
}

FileItem.Skeleton = function FileItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
