"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/ui/icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BugIcon, SettingsIcon, TerminalIcon } from "@/lib/icons";
import type { Project } from "@/types";

/**
 * Three destinations, not eight.
 *
 * - Bugs is the product; it is the landing route.
 * - Install is permanent, not a checklist step. It doubles as the component's
 *   documentation, so it has to stay reachable after setup is done.
 * - API keys and members live under Settings.
 */
export function NavMain({ project }: { project: Project }) {
  const pathname = usePathname();
  const base = `/dashboard/${project.slug}`;

  const items = [
    { href: `${base}/bugs`, icon: BugIcon, label: "Bugs" },
    { href: `${base}/install`, icon: TerminalIcon, label: "Install" },
    { href: `${base}/settings`, icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
                render={<Link href={item.href} />}
              >
                <Icon icon={item.icon} />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
