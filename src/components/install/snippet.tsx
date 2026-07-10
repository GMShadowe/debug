import { CopyButton } from "@/components/dashboard/copy-button";
import { cn } from "@/lib/utils";

/** A single command. Copy sits inline because the line is short. */
export function CommandLine({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-card p-1 pl-3">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12px] text-ink-muted">
        {value}
      </code>
      <CopyButton value={value} />
    </div>
  );
}

/**
 * A multi-line block. Copy floats in the header so it never covers code.
 *
 * `display` exists so a block can render a masked secret while the copy button
 * still yields the real one — showing the key in plaintext beside a masked field
 * would make the mask pointless.
 */
export function CodeBlock({
  value,
  display,
  filename,
  className,
}: {
  value: string;
  display?: string;
  filename?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-border bg-card",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-border border-b py-1 pr-1 pl-3">
        <span className="truncate font-mono text-[11px] text-ink-tertiary">
          {filename ?? " "}
        </span>
        <CopyButton value={value} />
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[12px] text-ink-muted leading-relaxed">
        <code>{display ?? value}</code>
      </pre>
    </div>
  );
}
