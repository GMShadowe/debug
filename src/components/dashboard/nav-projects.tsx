"use client";

import { ChartBar, DotsThree, FolderSimple, Gear } from "@phosphor-icons/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const PROJECT_URL = "/dashboard";

export function NavProjects({ projectName }: { projectName: string }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton render={<Link href={PROJECT_URL} />}>
            <FolderSimple />
            <span>{projectName}</span>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger render={<SidebarMenuAction showOnHover />}>
              <DotsThree />
              <span className="sr-only">More</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={isMobile ? "end" : "start"}
              className="w-48"
              side={isMobile ? "bottom" : "right"}
            >
              <DropdownMenuItem render={<Link href="/dashboard/reports" />}>
                <ChartBar className="text-ink-subtle" />
                <span>View reports</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/dashboard/settings" />}>
                <Gear className="text-ink-subtle" />
                <span>Project settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
