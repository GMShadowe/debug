import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Logo } from "@/components/brand/logo";
import { CreateProjectForm } from "@/components/onboarding/create-project-form";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "Create your project",
};

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth");
  }

  // Owners may hold many projects now, so this route is also "New project"
  // reached from the switcher. Having one already is not a reason to bounce.
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 flex flex-col items-center text-center">
          <Logo className="mb-8" />
          <span className="chip">Step 1 of 1</span>
          <h1 className="mt-6 font-heading font-semibold text-4xl text-foreground tracking-[-0.04em]">
            Create your project
          </h1>
          <p className="mt-3 max-w-sm text-ink-subtle">
            Every Lumen account starts with a single project. You can rename it
            any time.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-8">
          <CreateProjectForm />
        </div>
      </div>
    </main>
  );
}
