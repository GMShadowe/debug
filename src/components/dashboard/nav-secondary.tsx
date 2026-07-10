import type { ComponentProps } from "react";

import { Icon, type IconSvgElement } from "@/components/ui/icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavSecondaryItem {
  icon: IconSvgElement;
  title: string;
}

export function NavSecondary({
  items,
  ...props
}: {
  items: NavSecondaryItem[];
} & ComponentProps<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {/* Placeholder destinations until these pages exist. */}
              <SidebarMenuButton size="sm">
                <Icon className="size-3.5" icon={item.icon} />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
