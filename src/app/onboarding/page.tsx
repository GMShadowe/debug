import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Logo } from "@/components/brand/logo";
import { CreateProjectForm } from "@/components/onboarding/create-project-form";
import { getCurrentUser, getUserProject } from "@/lib/data";

export const metadata: Metadata = {
  title: "Create your project",
};

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth");
  }

  // Free tier: one project per user. If they already have one, skip onboarding.
  const project = await getUserProject();
  if (project) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo className="mb-6" />
          <span className="font-medium text-[13px] text-primary uppercase tracking-[0.08em]">
            Step 1 of 1
          </span>
          <h1 className="mt-3 font-heading font-semibold text-2xl text-foreground tracking-tight">
            Create your project
          </h1>
          <p className="mt-1.5 max-w-sm text-ink-subtle text-sm">
            Every Lumen account starts with a single project. You can rename it
            any time.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <CreateProjectForm />
        </div>
      </div>
    </main>
  );
}
