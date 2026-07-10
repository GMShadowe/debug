"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircleIcon } from "@/lib/icons";
import { createClient } from "@/lib/supabase/client";

/**
 * The last onboarding step verifies itself.
 *
 * Instead of asking "did it work?" and showing a Done button, we subscribe to
 * Postgres changes on bug_reports for this project. The moment the widget
 * delivers its first report, this flips to success and routes to it. That is
 * the difference between a checklist and a product.
 */
export function InstallListener({
  projectId,
  alreadyReceived,
}: {
  projectId: string;
  alreadyReceived: boolean;
}) {
  const router = useRouter();
  const [received, setReceived] = useState(alreadyReceived);

  useEffect(() => {
    if (alreadyReceived) {
      return;
    }

    const supabase = createClient();
    const channel = supabase
      .channel(`install:${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          filter: `project_id=eq.${projectId}`,
          schema: "public",
          table: "bug_reports",
        },
        () => {
          setReceived(true);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, alreadyReceived, router]);

  if (received) {
    return (
      <div className="flex items-center gap-2.5 rounded-lg border border-success/30 bg-success/10 px-4 py-3">
        <Icon
          className="size-4 shrink-0 text-success"
          icon={CheckCircleIcon}
          strokeWidth={2}
        />
        <p className="text-[13px] text-foreground">
          First report received. Lumen is live.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3">
      <Spinner className="size-3.5 text-ink-subtle" />
      <p className="text-[13px] text-ink-subtle">
        Listening for your first report…
      </p>
    </div>
  );
}
