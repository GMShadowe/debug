"use client";

import { Bell, CaretUpDown, Sparkle, UserCircle } from "@phosphor-icons/react";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { signOut } from "@/app/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { initials } from "@/lib/format";

export interface NavUserData {
  avatar: string | null;
  email: string;
  name: string | null;
}

export function NavUser({ user }: { user: NavUserData }) {
  const { isMobile } = useSidebar();
  const displayName = user.name ?? "Your account";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                className="data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground"
                size="lg"
              />
            }
          >
            <Avatar className="size-8 rounded-lg">
              {user.avatar ? (
                <AvatarImage alt={displayName} src={user.avatar} />
              ) : null}
              <AvatarFallback className="rounded-lg">
                {initials(user.name ?? user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{displayName}</span>
              <span className="truncate text-ink-subtle text-xs">
                {user.email}
              </span>
            </div>
            <CaretUpDown className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  {user.avatar ? (
                    <AvatarImage alt={displayName} src={user.avatar} />
                  ) : null}
                  <AvatarFallback className="rounded-lg">
                    {initials(user.name ?? user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-ink-subtle text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkle className="text-primary" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link href="/dashboard/settings" />}>
                <UserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/dashboard/settings" />}>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form action={signOut}>
              <button
                className="flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-left text-destructive text-sm outline-none hover:bg-destructive/10"
                type="submit"
              >
                <SignOut className="size-4" />
                Sign out
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
