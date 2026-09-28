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
