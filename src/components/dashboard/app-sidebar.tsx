import type { ComponentProps } from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser, type NavUserData } from "@/components/dashboard/nav-user";
import { ProjectSwitcher } from "@/components/dashboard/project-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { DocsIcon, SupportIcon } from "@/lib/icons";
import type { Project } from "@/types";

const NAV_SECONDARY = [
  { icon: DocsIcon, title: "Documentation" },
  { icon: SupportIcon, title: "Support" },
];

export function AppSidebar({
  project,
  projects,
  user,
  ...props
}: {
  project: Project;
  projects: Project[];
  user: NavUserData;
} & ComponentProps<typeof Sidebar>) {
  return (
    // `offcanvas`, not `icon`: a rail of unlabelled glyphs is a memory test.
    // Closing gives the content the full width, which is the actual reason
    // anyone collapses a sidebar. Toggle with the trigger or ⌘B.
    <Sidebar collapsible="offcanvas" variant="inset" {...props}>
      <SidebarHeader className="p-2">
        <ProjectSwitcher project={project} projects={projects} />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavMain project={project} />
        <NavSecondary className="mt-auto" items={NAV_SECONDARY} />
      </SidebarContent>

      <SidebarFooter className="p-2">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
