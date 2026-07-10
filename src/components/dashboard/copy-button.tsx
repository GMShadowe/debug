"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CheckIcon, CopyIcon } from "@/lib/icons";

const RESET_DELAY_MS = 2000;

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), RESET_DELAY_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    // No caret: this button copies, it does not open a menu.
    <Button onClick={handleCopy} size="sm" variant="outline">
      {copied ? (
        <Icon
          className="size-3.5 text-success"
          icon={CheckIcon}
          strokeWidth={2.5}
        />
      ) : (
        <Icon className="size-3.5" icon={CopyIcon} />
      )}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
