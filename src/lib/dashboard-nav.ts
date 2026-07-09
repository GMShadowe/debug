import type { Icon } from "@phosphor-icons/react";
import { Gear, SquaresFour, Warning } from "@phosphor-icons/react/dist/ssr";

export interface NavItem {
  /** Match the pathname exactly rather than by prefix. */
  exact?: boolean;
  href: string;
  icon: Icon;
  label: string;
}

export const DASHBOARD_NAV: NavItem[] = [
  { exact: true, href: "/dashboard", icon: SquaresFour, label: "Dashboard" },
  { href: "/dashboard/reports", icon: Warning, label: "Reports" },
  { href: "/dashboard/settings", icon: Gear, label: "Settings" },
];
