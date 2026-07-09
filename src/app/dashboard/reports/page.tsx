import type { Metadata } from "next";

import { ReportsExplorer } from "@/components/dashboard/reports-explorer";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { MOCK_REPORTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Reports",
};

export default function ReportsPage() {
  return (
    <PageContainer size="default">
      <div className="space-y-8">
        <PageHeader
          description="Every bug report submitted through your widget, with full context."
          title="Reports"
        />
        <ReportsExplorer reports={MOCK_REPORTS} />
      </div>
    </PageContainer>
  );
}
