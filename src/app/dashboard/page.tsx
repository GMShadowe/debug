import { redirect } from "next/navigation";

import { getProjects } from "@/lib/data";

/**
 * /dashboard is not a page.
 *
 * The old overview screen was a grid of KPI tiles that answered no question a
 * developer actually has on arrival. Lumen opens where the work is — the bug
 * inbox — the way Linear opens on Issues. This route only resolves scope.
 */
export default async function DashboardIndex() {
  const projects = await getProjects();

  if (projects.length === 0) {
    redirect("/onboarding");
  }

  const [project] = projects;
  // A project with no reports yet has one job: get installed.
  redirect(
    project.first_report_at
      ? `/dashboard/${project.slug}/bugs`
      : `/dashboard/${project.slug}/install`
  );
}
