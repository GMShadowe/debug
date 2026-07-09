import { PageContainer } from "@/components/layout/page-container";
import { ReportListSkeleton } from "@/components/shared/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportsLoading() {
  return (
    <PageContainer size="default">
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 w-72 rounded-md" />
        </div>
        <Skeleton className="h-3 w-28" />
        <ReportListSkeleton />
      </div>
    </PageContainer>
  );
}
