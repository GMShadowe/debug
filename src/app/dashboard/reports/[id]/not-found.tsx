import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function ReportNotFound() {
  return (
    <PageContainer size="default">
      <EmptyState
        action={
          <Button
            className="h-8 rounded-md px-3 text-sm"
            render={<Link href="/dashboard/reports">Back to reports</Link>}
          />
        }
        description="This report doesn't exist or may have been removed."
        icon={MagnifyingGlass}
        title="Report not found"
      />
    </PageContainer>
  );
}
