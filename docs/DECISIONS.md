# Decisions

Short ADR-style log of decisions made without blocking on user input, per the build prompt's instruction to record and continue rather than stall.

## ADR-001: No `/reference/interchange.html` prototype was present

**Context:** The build prompt says to study `/reference/interchange.html` if it exists and port its 13 modules and visual identity.
**Decision:** The repo was empty at session start — no reference file was provided. The transit-map concept, typography (Bricolage Grotesque / Atkinson Hyperlegible / Atkinson Hyperlegible Mono), cool grey-blue palette, and per-line colour tokens were implemented directly from the prompt's written description instead of ported from a prototype.
**Follow-up:** If the prototype file is added later, re-check `globals.css`, `tailwind.config.ts`, and the M1 module list against it and adjust.

## ADR-002: Drizzle ORM over Prisma

**Context:** The prompt allows either Prisma or Drizzle.
**Decision:** Drizzle. It has a lighter runtime, migrations are plain SQL (easy to review and to hand-write `pgvector` index DDL like HNSW that Prisma doesn't model well), and `drizzle-orm/postgres-js` composes cleanly with raw `sql` for full-text search and vector queries used throughout the search and AI-tutor milestones.
**Consequence:** Migrations are generated with `drizzle-kit generate` and checked into `/drizzle`; the health check and `content:sync` both go through `src/lib/db.ts`.

## ADR-003: pnpm as the package manager

**Context:** Not specified explicitly, but all prompt commands (`pnpm content:validate`, `pnpm content:new`) use the `pnpm` prefix.
**Decision:** Standardize on pnpm everywhere (Docker build, CI, Makefile) rather than mixing package managers.

## ADR-004: Auth.js v5 (beta)

**Context:** Auth.js's stable-for-Next.js-App-Router line is the v5 beta (`next-auth@5.0.0-beta.x`); v4 targets the Pages Router pattern.
**Decision:** Use the v5 beta, since it's what the App Router integration is designed around. Revisit if a stable v5 release lands during the project.

## ADR-005: M0 ships placeholder content scripts and DB schema

**Context:** `content:validate`, `content:sync`, `content:new`, and the Drizzle schema are referenced by `package.json`, the Makefile, and `docker-compose.yml`'s `migrate` service from M0 onward, but the real content schema and directory tree are M1 work.
**Decision:** Ship no-op/stub implementations in M0 so the full `docker compose up` path and CI both run end-to-end and stay green, then replace the stubs with real implementations in M1 without changing their call sites.

## ADR-006: Health check does a live `select 1`, not a pool-only check

**Context:** The Dockerfile `HEALTHCHECK` and `docker-compose.yml` depend on `/api/health` reflecting real DB connectivity, per the prompt.
**Decision:** `GET /api/health` runs `select 1` through Drizzle on every call rather than just checking that a client object exists, so a genuinely unreachable database returns HTTP 503.

## ADR-007: Content engine reads directly from the filesystem; no DB sync yet

**Context:** `CLAUDE.md`'s original architecture has `content:sync` write validated content into Postgres so progress/search can reference stable IDs. But progress tracking, auth, and search don't exist yet (M2/M3/M4).
**Decision:** For the first content batch, module/line pages read content straight from `/content` via `src/content/loader.ts` (fs + Zod validation) at request time, with no DB round-trip. `content:sync` stays a no-op stub. This gets real, browsable, interactive content shipped now without building progress/search infrastructure it can't use yet.
**Follow-up:** When M2 adds progress tracking, implement `content:sync` for real and switch module pages to read through it (or keep filesystem reads for content and add a separate progress-only DB layer — decide then).

## ADR-008: js-yaml pinned to v4, not v5

**Context:** v5 is ESM-only with a very different, undocumented-by-most-tutorials API (no default export, `load`/`dump` behave differently). It broke `tsx`'s import immediately.
**Decision:** Use `js-yaml@^4.1.0` (CJS, stable, default-export compatible, matches essentially every existing example/tutorial) plus `@types/js-yaml` for types.

## ADR-009: MDX rendering via `next-mdx-remote/rsc`, Mermaid rendered client-side

**Context:** Lessons need headings/callouts/tables/code-with-copy-button/Mermaid diagrams per `CLAUDE.md`.
**Decision:** Compile MDX server-side with `next-mdx-remote/rsc` + `remark-gfm` (tables, task lists), with a custom component map (`src/components/mdx/mdx-components.tsx`) — callouts are just styled blockquotes (`> **Note:** ...`) rather than a custom remark directive syntax, to keep the authoring format plain Markdown. Code blocks are a client component with a copy button; when the fenced language is `mermaid`, it's handed off to a client component that lazy-loads the `mermaid` package and renders to inline SVG (respecting `prefers-color-scheme`). This avoids a server-side Mermaid renderer (heavier, less current) at the cost of a client-only diagram render.

## ADR-010: Quiz/flashcard/exercise interactivity ships now, auto-grading is partial

**Context:** M2 (quizzes/flashcards) and M4 (AI-graded short answer) are separate milestones, but shipping module pages with static, non-interactive quizzes would be a poor experience for reviewing this batch.
**Decision:** Built full client-side interactivity now (`src/components/module/*`): flashcard flip/navigate, quiz answer capture and auto-grading for single/multi/order/match/predict types, and reveal-model-answer for exercises. `short`-type quiz questions and exercise rubric feedback are explicitly labeled "AI-graded in M4" rather than faked — no auto-grading logic pretends to score free text. FSRS spaced repetition and server-persisted progress are still M2/M3 work; today's flashcard/quiz state is component-local and resets on reload.
