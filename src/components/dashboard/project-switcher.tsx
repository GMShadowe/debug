"use client";

import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CheckIcon, ChevronUpDownIcon, PlusIcon } from "@/lib/icons";
import type { Project } from "@/types";

/**
 * The project is a *scope*, not a destination. Putting it in a switcher (as
 * Vercel, Supabase, and Neon do) keeps it one click away from anywhere, instead
 * of spending a top-level nav slot and an extra hop on every navigation.
 */
export function ProjectSwitcher({
  project,
  projects,
}: {
  project: Project;
  projects: Project[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                className="data-[popup-open]:bg-sidebar-accent"
                size="lg"
              />
            }
          >
            <Logo className="shrink-0" withWordmark={false} />
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-medium text-[13px]">
                {project.name}
              </span>
              <span className="flex items-center gap-1.5 truncate text-[11px] text-ink-tertiary">
                <span
                  aria-hidden="true"
                  className={
                    project.first_report_at
                      ? "size-1.5 rounded-full bg-success"
                      : "size-1.5 rounded-full bg-ink-tertiary"
                  }
                />
                {project.first_report_at ? "Live" : "Not installed"}
              </span>
            </div>
            <Icon
              className="ml-auto size-3.5 text-ink-tertiary"
              icon={ChevronUpDownIcon}
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-60 rounded-md"
            sideOffset={6}
          >
            <DropdownMenuLabel className="text-[11px] text-ink-tertiary uppercase tracking-wider">
              Projects
            </DropdownMenuLabel>
            {projects.map((item) => (
              <DropdownMenuItem
                key={item.id}
                render={<Link href={`/dashboard/${item.slug}/bugs`} />}
              >
                <span className="truncate">{item.name}</span>
                {item.id === project.id ? (
                  <Icon className="ml-auto size-3.5" icon={CheckIcon} />
                ) : null}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/onboarding" />}>
              <Icon className="size-3.5" icon={PlusIcon} />
              New project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
