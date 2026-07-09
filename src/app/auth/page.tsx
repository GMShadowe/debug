import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { GoogleButton } from "@/components/auth/google-button";
import { Logo } from "@/components/brand/logo";
import { getUserProject } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign in",
};

const ERROR_MESSAGES: Record<string, string> = {
  auth_callback_failed: "Sign-in could not be completed. Please try again.",
  google_signin_failed: "We couldn't start Google sign-in. Please try again.",
};

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Already signed in — send them onward.
  if (user) {
    const project = await getUserProject();
    redirect(project ? "/dashboard" : "/onboarding");
  }

  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link className="mb-6" href="/">
            <Logo />
          </Link>
          <h1 className="font-heading font-semibold text-foreground text-xl tracking-tight">
            Welcome to Lumen
          </h1>
          <p className="mt-1.5 text-ink-subtle text-sm">
            Sign in to your dashboard or create a new account.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          {errorMessage ? (
            <p className="mb-4 flex items-center gap-1.5 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-destructive text-xs">
              <WarningCircle className="size-4 shrink-0" />
              {errorMessage}
            </p>
          ) : null}

          <GoogleButton />

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-ink-subtle text-xs">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <AuthForm />
        </div>

        <p className="mt-6 text-center text-ink-subtle text-xs">
          By continuing you agree to Lumen's Terms and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
