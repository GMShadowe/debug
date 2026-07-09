# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**lumen** is an early-stage Next.js 16 (App Router) application. The `src/app` layer is still the create-next-app scaffold; the substantive code so far is a large shadcn/ui component library under `src/components/ui`. Package manager is **pnpm**.

## Commands

- **Dev server**: `pnpm dev` (http://localhost:3000)
- **Build**: `pnpm build`
- **Start (prod)**: `pnpm start`
- **Lint**: `pnpm lint` (`biome check`) — full Ultracite check: `pnpm check`
- **Format**: `pnpm format` (`biome format --write`)
- **Auto-fix lint + format**: `pnpm fix` (`pnpm dlx ultracite fix`) — run before committing
- **Add a shadcn component**: `pnpm dlx shadcn@latest add <name>`

There is **no test runner configured**. The Husky `pre-commit` hook (`.husky/pre-commit`) invokes `pnpm test`, which currently has no matching script and will fail the commit — add a `test` script (or remove that hook line) before relying on commits. A separate `.husky/pre-commit` block also runs `ultracite fix` and re-stages files.

## Architecture & Conventions

- **Next.js config** (`next.config.ts`): React Compiler is **enabled** (`reactCompiler: true`, via `babel-plugin-react-compiler`). Avoid manual `useMemo`/`useCallback` micro-optimizations the compiler handles; do not fight the compiler with mutation patterns.
- **React 19** with RSC. `components.json` sets `"rsc": true` — default to Server Components; add `"use client"` only where interactivity requires it.
- **Path alias**: `@/*` → `src/*`. Component aliases (from `components.json`): `@/components/ui`, `@/lib/utils`, `@/hooks`.
- **Styling**: Tailwind CSS v4 (PostCSS-based, no `tailwind.config`; theme lives in `src/app/globals.css` via `@theme inline` + CSS variables). Dark mode is class-based (`@custom-variant dark`). Base color `neutral`.
- **UI primitives**: shadcn/ui built on **@base-ui/react** (not Radix), style preset `base-lyra`. Icons come from **@phosphor-icons/react** (`iconLibrary: "phosphor"`) — use Phosphor, not Lucide.
- **`cn()` helper** (`src/lib/utils.ts`): `twMerge(clsx(...))` — use for all conditional className composition.
- **Fonts** (`src/app/layout.tsx`): Geist Sans, Geist Mono, and JetBrains Mono loaded via `next/font/google` as CSS variables. Note `--font-mono` is the default body font and `--font-heading` maps to mono.
- **Charts**: Recharts 3 (`src/components/ui/chart.tsx`).

## Code Standards

This repo enforces **Ultracite** (Biome preset) — see `.claude/CLAUDE.md` for the full ruleset. Biome config (`biome.json`) extends `ultracite/biome/{core,react,next}` with 2-space indentation and organize-imports on. Most issues auto-fix via `pnpm fix`; run it before committing.
