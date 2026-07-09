import {
  BookOpen,
  FolderSimple,
  Gear,
  Lifebuoy,
  PaperPlaneTilt,
  SquaresFour,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentProps } from "react";

import { Logo } from "@/components/brand/logo";
import { NavMain, type NavMainItem } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser, type NavUserData } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NAV_MAIN: NavMainItem[] = [
  { icon: SquaresFour, title: "Dashboard", url: "/dashboard" },
  { icon: Warning, title: "Reports", url: "/dashboard/reports" },
  {
    icon: Gear,
    items: [
      { title: "Project", url: "/dashboard/settings#project" },
      { title: "Widget", url: "/dashboard/settings#widget" },
      { title: "Notifications", url: "/dashboard/settings#notifications" },
    ],
    title: "Settings",
    url: "/dashboard/settings",
  },
];

const NAV_SECONDARY = [
  { icon: Lifebuoy, title: "Support" },
  { icon: PaperPlaneTilt, title: "Feedback" },
  { icon: BookOpen, title: "Documentation" },
];

export function AppSidebar({
  projectName,
  user,
  ...props
}: {
  projectName: string;
  user: NavUserData;
} & ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/dashboard" />} size="lg">
              <Logo className="shrink-0" withWordmark={false} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{projectName}</span>
                <span className="truncate text-ink-subtle text-xs">
                  Free plan
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={NAV_MAIN} />
        <NavProjects
          projects={[
            { icon: FolderSimple, name: projectName, url: "/dashboard" },
          ]}
        />
        <NavSecondary className="mt-auto" items={NAV_SECONDARY} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
