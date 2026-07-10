import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser, getProjectBySlug, getProjects } from "@/lib/data";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = await params;

  const [project, projects, user] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
    getCurrentUser(),
  ]);

  // RLS already hides other people's projects, so "not visible" and "does not
  // exist" are the same 404 to the caller. No information leak either way.
  if (!project) {
    notFound();
  }

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    null;

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar
        project={project}
        projects={projects}
        user={{
          avatar:
            (user?.user_metadata.avatar_url as string | undefined) ?? null,
          email: user?.email ?? "",
          name: displayName,
        }}
      />
      {/*
       * `ml-0`: the sidebar's own fixed container already pads 8px on its right,
       * so a left margin here stacked a second gutter and pushed the panel away
       * from the rail. The outer gutter stays 8px on the other three sides.
       */}
      <SidebarInset className="min-h-0 overflow-hidden md:my-2 md:mr-2 md:ml-0 md:rounded-lg md:border md:border-border md:bg-surface-app">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
