"use client";

import { CaretDown, Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

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
    <Button
      className="h-8 gap-1.5 rounded-md px-2.5 text-sm"
      onClick={handleCopy}
      variant="outline"
    >
      {copied ? (
        <Check className="size-3.5 text-success" weight="bold" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy"}
      <CaretDown className="size-3 text-ink-subtle" />
    </Button>
  );
}
