import type { ReactNode } from "react";

export function Step({
  n,
  title,
  description,
  children,
}: {
  n: number;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-[24px_minmax(0,1fr)] sm:gap-4">
      <span className="grid size-6 shrink-0 place-items-center rounded-md border border-border font-medium text-[11px] text-ink-subtle tabular-nums">
        {n}
      </span>
      <div className="min-w-0">
        <h2 className="font-medium text-[13px] text-foreground">{title}</h2>
        <p className="mt-1 mb-3 text-[12px] text-ink-tertiary leading-relaxed">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-sm bg-accent px-1 py-0.5 font-mono text-[11px] text-ink-muted">
      {children}
    </code>
  );
}
