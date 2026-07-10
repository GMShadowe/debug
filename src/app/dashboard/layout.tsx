import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getCurrentUser } from "@/lib/data";

/**
 * Auth guard only. The app chrome lives in `[project]/layout.tsx`, because the
 * sidebar cannot be rendered until we know which project is in scope.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth");
  }

  return children;
}
