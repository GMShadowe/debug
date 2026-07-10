"use client";

import { signOut } from "@/app/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { initials } from "@/lib/format";
import { ChevronUpDownIcon, LogoutIcon } from "@/lib/icons";

export interface NavUserData {
  avatar: string | null;
  email: string;
  name: string | null;
}

/**
 * Account menu. It previously offered "Upgrade to Pro", "Account", and
 * "Notifications" — the latter two linking to /dashboard/settings, a route that
 * no longer exists, and none of the three doing anything. A menu of dead ends
 * teaches people not to open the menu.
 */
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
            <Avatar className="size-6 rounded-md">
              {user.avatar ? (
                <AvatarImage alt={displayName} src={user.avatar} />
              ) : null}
              <AvatarFallback className="rounded-md text-[10px]">
                {initials(user.name ?? user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-medium text-[13px]">
                {displayName}
              </span>
              <span className="truncate text-[11px] text-ink-tertiary">
                {user.email}
              </span>
            </div>
            <Icon
              className="ml-auto size-3.5 text-ink-tertiary"
              icon={ChevronUpDownIcon}
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-md"
            side={isMobile ? "bottom" : "right"}
            sideOffset={6}
          >
            <div className="px-2 py-1.5">
              <p className="truncate font-medium text-[13px] text-foreground">
                {displayName}
              </p>
              <p className="truncate text-[11px] text-ink-tertiary">
                {user.email}
              </p>
            </div>
            <DropdownMenuSeparator />
            <form action={signOut}>
              <DropdownMenuItem
                className="w-full text-destructive"
                render={<button type="submit" />}
              >
                <Icon className="size-3.5" icon={LogoutIcon} />
                Sign out
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
