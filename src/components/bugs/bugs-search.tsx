"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { CloseIcon, SearchIcon } from "@/lib/icons";

/**
 * Search reads and writes the `q` param, so a search result is a shareable URL
 * and the browser back button undoes it. Press `/` to focus, Escape to clear.
 */
export function BugsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState(params.get("q") ?? "");

  // Keep the field in step when the URL changes underneath us (Reset, back).
  const urlQuery = params.get("q") ?? "";
  useEffect(() => {
    setQ(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function push(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set("q", value);
    } else {
      next.delete("q");
    }
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <form
      aria-label="Search reports"
      className="relative"
      onSubmit={(event) => {
        event.preventDefault();
        push(q.trim());
      }}
    >
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-tertiary"
        icon={SearchIcon}
      />
      <label className="sr-only" htmlFor="bugs-search">
        Search reports
      </label>
      <input
        className="h-7 w-44 rounded-md border border-border bg-background pr-8 pl-8 text-[13px] text-foreground transition-[width,border-color] duration-150 placeholder:text-ink-tertiary focus:w-64 focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-app"
        id="bugs-search"
        onChange={(event) => setQ(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setQ("");
            push("");
            inputRef.current?.blur();
          }
        }}
        placeholder="Search reports…"
        ref={inputRef}
        type="search"
        value={q}
      />
      {q ? (
        <button
          aria-label="Clear search"
          className="absolute top-1/2 right-1.5 grid size-5 -translate-y-1/2 cursor-pointer place-items-center rounded-sm text-ink-tertiary transition-colors hover:bg-accent hover:text-foreground"
          onClick={() => {
            setQ("");
            push("");
          }}
          type="button"
        >
          <Icon className="size-3" icon={CloseIcon} />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute top-1/2 right-2 hidden size-4.5 -translate-y-1/2 items-center justify-center rounded-sm border border-border font-mono text-[10px] text-ink-tertiary sm:flex">
          /
        </kbd>
      )}
    </form>
  );
}
