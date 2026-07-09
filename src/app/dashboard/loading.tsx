import { PageContainer } from "@/components/layout/page-container";
import {
  ReportListSkeleton,
  StatGridSkeleton,
} from "@/components/shared/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <PageContainer className="max-w-6xl" size="full">
      <div className="space-y-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-8 w-80 rounded-md" />
          </div>
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
        <StatGridSkeleton />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Skeleton className="h-80 rounded-xl lg:col-span-2" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-5 w-36" />
          <ReportListSkeleton />
        </div>
      </div>
    </PageContainer>
  );
}
