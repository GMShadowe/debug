"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  SettingsCard,
  SettingsCardBody,
  SettingsCardFooter,
} from "@/components/settings/settings-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export interface Preference {
  defaultChecked?: boolean;
  description: string;
  id: string;
  label: string;
}

export function PreferencesForm({
  preferences,
}: {
  preferences: Preference[];
}) {
  const initial = Object.fromEntries(
    preferences.map((p) => [p.id, Boolean(p.defaultChecked)])
  );
  const [values, setValues] = useState<Record<string, boolean>>(initial);

  const dirty = preferences.some((p) => values[p.id] !== initial[p.id]);

  function toggle(id: string, checked: boolean) {
    setValues((prev) => ({ ...prev, [id]: checked }));
  }

  function onSave() {
    toast.success("Preferences saved");
  }

  return (
    <SettingsCard>
      <SettingsCardBody className="divide-y divide-border py-0">
        {preferences.map((preference) => (
          <div
            className="flex items-center justify-between gap-4 py-4 first:pt-5 last:pb-5"
            key={preference.id}
          >
            <div className="space-y-0.5">
              <p className="font-medium text-foreground text-sm">
                {preference.label}
              </p>
              <p className="text-ink-subtle text-xs">
                {preference.description}
              </p>
            </div>
            <Switch
              checked={values[preference.id]}
              onCheckedChange={(checked) => toggle(preference.id, checked)}
            />
          </div>
        ))}
      </SettingsCardBody>

      <SettingsCardFooter>
        <Button
          className="h-8 rounded-md px-3 text-sm"
          disabled={!dirty}
          onClick={onSave}
          type="button"
        >
          Save changes
        </Button>
      </SettingsCardFooter>
    </SettingsCard>
  );
}
