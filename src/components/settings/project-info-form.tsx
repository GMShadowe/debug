"use client";

import { useState } from "react";
import { toast } from "sonner";

import { ApiKeyField } from "@/components/settings/api-key-field";
import {
  SettingsCard,
  SettingsCardBody,
  SettingsCardFooter,
} from "@/components/settings/settings-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProjectInfoForm({
  initialName,
  apiKey,
}: {
  initialName: string;
  apiKey: string;
}) {
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
        <SettingsCardBody className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              className="h-9 max-w-md"
              id="project-name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <p className="text-ink-subtle text-xs">
              This is how your project appears across Lumen.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">API key</Label>
            <ApiKeyField apiKey={apiKey} />
            <p className="text-ink-subtle text-xs">
              Use this key to authenticate the widget on your site.
            </p>
          </div>
        </SettingsCardBody>

        <SettingsCardFooter>
          <span className="mr-auto text-ink-subtle text-xs">
            {dirty ? "You have unsaved changes" : "All changes saved"}
          </span>
          <Button
            className="h-8 rounded-md px-3 text-sm"
            disabled={!dirty}
            type="submit"
          >
            Save changes
          </Button>
        </SettingsCardFooter>
      </SettingsCard>
    </form>
  );
}
