"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  SettingsCard,
  SettingsCardBody,
  SettingsCardFooter,
} from "@/components/settings/settings-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Project identity only. The API key used to live here *and* in the API keys
 * section directly below — the same key rendered twice on one page, which makes
 * a reader wonder whether they are looking at two different keys.
 */
export function ProjectInfoForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const dirty = name.trim() !== initialName && name.trim().length > 0;

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Placeholder — persistence lands with the project update action.
    toast.success("Project settings saved");
  }

  return (
    <form onSubmit={onSubmit}>
      <SettingsCard>
        <SettingsCardBody>
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              className="max-w-sm"
              id="project-name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <p className="text-[12px] text-ink-tertiary">
              This is how your project appears across Lumen.
            </p>
          </div>
        </SettingsCardBody>

        <SettingsCardFooter>
          <span className="mr-auto text-[12px] text-ink-tertiary">
            {dirty ? "Unsaved changes" : "All changes saved"}
          </span>
          <Button disabled={!dirty} size="sm" type="submit">
            Save changes
          </Button>
        </SettingsCardFooter>
      </SettingsCard>
    </form>
  );
}
