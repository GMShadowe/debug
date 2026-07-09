import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser, getUserProject } from "@/lib/data";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth");
  }

  // Free tier: no project yet means the user still needs onboarding.
  const project = await getUserProject();
  if (!project) {
    redirect("/onboarding");
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    null;
  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ?? null;

  return (
    <SidebarProvider>
      <AppSidebar
        projectName={project.name}
        user={{ avatar: avatarUrl, email: user.email ?? "", name: displayName }}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-border border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
            <PageBreadcrumbs />
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
