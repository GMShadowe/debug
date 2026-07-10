"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { maskApiKey } from "@/lib/format";
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon } from "@/lib/icons";

/**
 * Optionally controlled. The Install page shows the key in three places — this
 * field, an `.env` line, and a script tag — and one eye must unmask all of them,
 * so it lifts `revealed` up. Used bare (Settings) it keeps its own state.
 */
export function ApiKeyField({
  apiKey,
  revealed: revealedProp,
  onRevealedChange,
}: {
  apiKey: string;
  revealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
}) {
  const [internalRevealed, setInternalRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const revealed = revealedProp ?? internalRevealed;

  function toggle() {
    const next = !revealed;
    if (onRevealedChange) {
      onRevealedChange(next);
    } else {
      setInternalRevealed(next);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-2">
      <code className="flex h-9 flex-1 items-center overflow-hidden truncate rounded-md border border-border bg-muted px-3 font-mono text-foreground text-sm">
        {revealed ? apiKey : maskApiKey(apiKey)}
      </code>
      <Button
        aria-label={revealed ? "Hide API key" : "Reveal API key"}
        aria-pressed={revealed}
        className="size-9 rounded-md"
        onClick={toggle}
        size="icon"
        variant="outline"
      >
        {revealed ? (
          <Icon className="size-4" icon={EyeOffIcon} />
        ) : (
          <Icon className="size-4" icon={EyeIcon} />
        )}
      </Button>
      <Button
        aria-label="Copy API key"
        className="size-9 rounded-md"
        onClick={copy}
        size="icon"
        variant="outline"
      >
        {copied ? (
          <Icon
            className="size-4 text-success"
            icon={CheckIcon}
            strokeWidth={2.5}
          />
        ) : (
          <Icon className="size-4" icon={CopyIcon} />
        )}
      </Button>
    </div>
  );
}
