"use client";

import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signInWithPassword, signUpWithPassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="h-10 w-full gap-2 rounded-md text-sm"
      disabled={pending}
      type="submit"
    >
      {pending ? <Spinner className="size-4" /> : null}
      {label}
    </Button>
  );
}

function FormError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }
  return (
    <p className="flex items-center gap-1.5 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-destructive text-xs">
      <WarningCircle className="size-4 shrink-0" />
      {message}
    </p>
  );
}

export function AuthForm() {
  const [signInState, signInAction] = useActionState(
    signInWithPassword,
    undefined
  );
  const [signUpState, signUpAction] = useActionState(
    signUpWithPassword,
    undefined
  );

  return (
    <Tabs className="w-full" defaultValue="sign-in">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-in">Sign in</TabsTrigger>
        <TabsTrigger value="sign-up">Create account</TabsTrigger>
      </TabsList>

      <TabsContent className="mt-6" value="sign-in">
        <form action={signInAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              autoComplete="email"
              className="h-10"
              id="signin-email"
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <Input
              autoComplete="current-password"
              className="h-10"
              id="signin-password"
              name="password"
              placeholder="••••••••"
              required
              type="password"
            />
          </div>
          <FormError message={signInState?.error} />
          <SubmitButton label="Sign in" />
        </form>
      </TabsContent>

      <TabsContent className="mt-6" value="sign-up">
        <form action={signUpAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Name</Label>
            <Input
              autoComplete="name"
              className="h-10"
              id="signup-name"
              name="name"
              placeholder="Ada Lovelace"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              autoComplete="email"
              className="h-10"
              id="signup-email"
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              autoComplete="new-password"
              className="h-10"
              id="signup-password"
              name="password"
              placeholder="At least 8 characters"
              required
              type="password"
            />
          </div>
          <FormError message={signUpState?.error} />
          <SubmitButton label="Create account" />
        </form>
      </TabsContent>
    </Tabs>
  );
}
