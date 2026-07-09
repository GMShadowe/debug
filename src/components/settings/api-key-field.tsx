"use client";

import { Check, Copy, Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { maskApiKey } from "@/lib/format";

export function ApiKeyField({ apiKey }: { apiKey: string }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

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
        className="size-9 rounded-md"
        onClick={() => setRevealed((v) => !v)}
        size="icon"
        variant="outline"
      >
        {revealed ? (
          <EyeSlash className="size-4" />
        ) : (
          <Eye className="size-4" />
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
          <Check className="size-4 text-success" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
    </div>
  );
}
