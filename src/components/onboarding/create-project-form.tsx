"use client";

import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { createProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="h-10 w-full gap-2 rounded-md text-sm"
      disabled={pending}
      type="submit"
    >
      {pending ? <Spinner className="size-4" /> : null}
      Create project
    </Button>
  );
}

export function CreateProjectForm() {
  const [state, action] = useActionState(createProject, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project name</Label>
        <Input
          autoFocus
          className="h-10"
          id="name"
          name="name"
          placeholder="Acme Web App"
          required
          type="text"
        />
        <p className="text-ink-subtle text-xs">
          This is how your project appears across Lumen.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain">
          Website domain <span className="text-ink-subtle">(optional)</span>
        </Label>
        <Input
          className="h-10"
          id="domain"
          name="domain"
          placeholder="acme.com"
          type="text"
        />
      </div>

      {state?.error ? (
        <p className="flex items-center gap-1.5 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-destructive text-xs">
          <WarningCircle className="size-4 shrink-0" />
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
