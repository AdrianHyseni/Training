# CLAUDE.md

Guidance for anyone (human or AI) working in this repository.

## What this is

Interchange is a learning platform for enterprise integration, MuleSoft, SAP BTP Integration Suite, AWS/Azure integration services, data engineering, PostgreSQL, implementation engineering, forward deployed engineering with generative AI, AI engineering, and Anthropic/Claude training.

The core UX metaphor is a **transit map**: each topic is a line, each module is a station, and a station fills in when its quiz is passed. See `docs/PLAN.md` for the milestone plan and `docs/DECISIONS.md` for architectural decisions.

## Stack

| Area | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript strict mode |
| Styling | Tailwind CSS, design tokens as CSS variables (`src/app/globals.css`), light + dark |
| Components | Radix UI primitives for dialogs, tabs, menus |
| Database | PostgreSQL 17 (`pgvector/pgvector:pg17`), Drizzle ORM, migrations in `/drizzle` |
| Search | Postgres full-text search (`tsvector` + GIN) plus `pgvector` for semantic search, behind a swappable embeddings provider interface |
| Auth | Auth.js — email magic link, GitHub OAuth, Google OAuth. Roles: `learner`, `author`, `admin` |
| Content | MDX lessons, YAML quizzes/cards/exercises/metadata, validated with Zod, synced into Postgres via `content:sync` |
| AI | Anthropic API via the official TypeScript SDK, server-side only. Model id from `ANTHROPIC_MODEL` env var — never hard-coded |
| Testing | Vitest (unit), Playwright (e2e + mobile viewport project), axe-core (accessibility) |
| Mobile | Responsive from 360px, installable PWA, offline lessons/flashcards |

## Commands

```bash
pnpm dev                 # start Next.js dev server
pnpm build                # production build (standalone output)
pnpm start                # run the production build
pnpm lint                 # eslint
pnpm typecheck             # tsc --noEmit
pnpm test                  # vitest unit tests
pnpm test:e2e               # playwright e2e tests
pnpm db:generate            # drizzle-kit generate (new migration from schema)
pnpm db:migrate              # apply migrations
pnpm content:validate         # validate all content against Zod schemas
pnpm content:sync              # sync validated content into Postgres
pnpm content:new <line> <mod>   # scaffold a new module directory
```

### Docker

```bash
docker compose up                       # dev stack: app, db, migrate, mailpit
docker compose -f docker-compose.prod.yml up   # production-shaped compose (no mailpit/bind mounts)
docker compose -f docker-compose.labs.yml --profile postgres up   # optional labs (postgres|kafka|aws|azure)
```

`make up`, `make down`, `make logs`, `make migrate`, `make seed`, `make test`, `make lab-postgres`, `make lab-kafka`, `make lab-aws`, `make lab-azure` wrap the above.

## Folder structure

```
src/
  app/                # Next.js App Router: pages, layouts, API routes
    api/health/        # health check (checks DB connectivity)
  ai/
    prompts/            # versioned prompt files, each with unit tests (added in M4)
  components/           # shared UI components (added as needed)
  content/               # content:validate / content:sync / content:new scripts
  db/                    # Drizzle schema, migrate script
  lib/                    # shared server/client utilities (db client, etc.)
content/
  <line>/<module>/         # module.yaml, lesson.mdx, quiz.yaml, cards.yaml, exercises.yaml, lab.md?
drizzle/                    # generated SQL migrations (checked in)
docs/                        # PLAN.md, DECISIONS.md, DEPLOYMENT.md, CONTENT_REVIEW.md
e2e/                          # Playwright specs
```

## Content schema summary

Each module lives at `content/<line>/<module-id>/`:

- **`module.yaml`** — id, line, title, level (`foundation|practitioner|advanced|architect`), estimatedMinutes, prerequisites, related (drawn as interchange links), certifications, `lastReviewed`, `verify` (open items needing a human source check)
- **`lesson.mdx`** — 1,500–3,000 words, headings/callouts/tables, syntax-highlighted code, Mermaid diagrams where the topic has structure
- **`quiz.yaml`** — `passThreshold` (default 0.75), questions with `type` (`single|multi|order|match|predict|short`), `options`, `correct`, `explanation` (must say *why*, not just restate), `domain` (for mock-exam weighting)
- **`cards.yaml`** — at least 10 flashcards per module
- **`exercises.yaml`** — at least 2 design exercises, each with `prompt`, `modelAnswer` (MDX), `rubric` (criteria + points)
- **`lab.md`** — for lab modules: prerequisites, compose profile, numbered steps, expected output, verify checklist

Minimum per module: lesson (1,500–3,000 words), 1+ Mermaid diagram where structural, 2 exercises, 10 flashcards, 10 quiz questions across 3+ types, 5 glossary terms. All content validated with Zod at build time and in CI via `content:validate`.

## Coding conventions

- TypeScript strict mode; no `any` without a comment explaining why it's unavoidable.
- Server-only code (DB access, Anthropic API calls) stays in `src/lib`, `src/db`, `src/ai` — never imported into client components.
- Validate every API route input with Zod.
- No secrets in the client bundle — check `NEXT_PUBLIC_*` usage carefully.
- Prefer Radix primitives over hand-rolled accessibility for dialogs/tabs/menus.
- Design tokens live as CSS variables in `globals.css`; reference them via Tailwind's `rgb(var(--token) / <alpha-value>)` pattern, don't hard-code colors in components.
- Keep AI prompts in `/src/ai/prompts/` as versioned files with their own tests (fixtures + mocked client).
- Degrade gracefully without `ANTHROPIC_API_KEY`: AI features hide, nothing crashes.

## Accuracy rules

1. Write like an experienced practitioner explaining things to a colleague. Plain, direct language: no marketing tone, no filler, no "in today's fast-paced world".
2. Vendor facts change — that includes service names, exam codes, limits, pricing and product features for AWS, Azure, SAP, MuleSoft/Salesforce and Anthropic.
   - Prefer durable concepts over volatile specifics.
   - Where a specific matters, add it to the module's `verify` list with the official source URL to check.
   - Never invent exam codes, limits, or API parameters.
3. Anthropic/Claude content must be checked against:
   - https://docs.claude.com (use the docs map at https://docs.claude.com/en/docs_site_map.md)
   - the Claude Code docs
   - https://www.anthropic.com/learn

   If a detail can't be verified, mark it and describe it at the concept level.
4. Certification modules state which official exam guide they were aligned to and when, and link to it.
5. Every quiz explanation must say *why* the right answer is right, not just restate it.

## Current status

M0 (Foundation) — see `docs/PLAN.md` for the full milestone plan and what's next.
