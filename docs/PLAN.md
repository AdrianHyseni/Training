# Interchange — Plan

## Status: M0 (Foundation) complete, pending review

This document tracks the milestone plan from the build prompt. Each milestone should leave the app runnable (`docker compose up`) and green on lint/typecheck/tests. Decisions made without blocking on user input are logged in `docs/DECISIONS.md`.

## Open questions for you

1. **No `/reference/interchange.html` prototype was in the repo.** I built the transit-map concept, typography, and colour system directly from the written spec (see ADR-001). If you have the prototype file, drop it at `/reference/interchange.html` and I'll reconcile M1's module list and visuals against it before authoring the 13 ported modules.
2. **GHCR image path / GitHub org** for `release.yml` and `docker-compose.prod.yml` — currently `ghcr.io/${{ github.repository }}`, which resolves automatically once pushed; no action needed unless you want a different registry.
3. **OAuth app credentials** (GitHub, Google) and a real `ANTHROPIC_API_KEY`/`ANTHROPIC_MODEL` are needed for those features to activate — the app runs fine without them (auth providers not configured, AI features hidden) but you'll need to supply them in `.env` when you're ready to exercise those paths.

Everything else in the prompt had a reasonable default, recorded in `docs/DECISIONS.md`, and I kept going.

## Milestones

- **[x] M0 — Foundation**
  - Next.js 15 App Router + TypeScript strict scaffold
  - Tailwind with design tokens as CSS variables (`src/app/globals.css`): cool grey-blue background, light + dark via `prefers-color-scheme` and a `.dark`/`data-theme` override, one colour token per line (11 lines)
  - Bricolage Grotesque / Atkinson Hyperlegible / Atkinson Hyperlegible Mono wired via `next/font/google` in `src/app/layout.tsx`
  - Layout shell: skip link, header, footer, focus-visible ring, reduced-motion media query
  - Placeholder home page listing all 11 lines (real transit map SVG lands in M2)
  - `GET /api/health` — live DB check via Drizzle, 503 on failure
  - Drizzle ORM wired to Postgres 17 + pgvector image, minimal placeholder schema, migrate script
  - Docker: multi-stage `Dockerfile` (deps → build → runtime, standalone output, non-root user, `HEALTHCHECK`), `docker-compose.yml` (app/db/migrate/mailpit), `docker-compose.prod.yml` (resource limits, restart policies, optional Caddy TLS proxy), `docker-compose.labs.yml` (Postgres/Kafka/LocalStack/Azurite behind profiles, expanded in M5)
  - `.env.example`, `Makefile`, `.dockerignore`
  - CI: GitHub Actions (`ci.yml` — lint/typecheck/unit/content-validate/build, plus a Playwright job against the compose stack; `release.yml` — multi-arch GHCR push on `main`), `bitbucket-pipelines.yml` equivalent
  - `CLAUDE.md`, this plan, `docs/DECISIONS.md`
  - Stub `content:validate` / `content:sync` / `content:new` scripts so the full pipeline runs end-to-end before real content exists (replaced in M1)
  - Minimal Vitest smoke test and Playwright smoke spec so "tests" are meaningfully green, not just absent

- **[ ] M1 — Content engine**
  - Zod schemas for `module.yaml`, `quiz.yaml`, `cards.yaml`, `exercises.yaml`, `lab.md` frontmatter
  - Real `content:validate` (schemas, unique IDs, broken internal links, quiz `correct` index bounds, minimum content counts, `lastReviewed` presence)
  - Real `content:new <line> <module>` scaffolder
  - MDX rendering pipeline: headings, callouts, tables, syntax-highlighted code with copy buttons, Mermaid diagrams
  - Real `content:sync` writing into Postgres with stable IDs
  - Port the 13 prototype modules (reconciled against `/reference/interchange.html` if supplied — see open question 1)

- **[ ] M2 — Core learning**
  - Auth.js: email magic link + GitHub + Google OAuth, `learner`/`author`/`admin` roles
  - Generated transit map: desktop pannable/zoomable SVG with interchange links, mobile expandable line list, station states (not started / in progress / passed)
  - Module page with tabs: Lesson, Exercises, Flashcards, Quiz, Lab (when present)
  - Quizzes: single, multi, order, match, predict (AI-graded short answer deferred to M4)
  - Flashcards with FSRS, daily review queue
  - Progress tracking, dashboard, role-based learning paths

- **[ ] M3 — Search and mobile**
  - Postgres full-text search + ⌘K command palette
  - PWA: offline lessons/flashcards, background sync queue for progress
  - Swipe gestures on mobile flashcards
  - Playwright mobile-viewport suite

- **[ ] M4 — AI tutor**
  - Hybrid retrieval (pgvector + full-text) behind a swappable embeddings provider
  - Tutor chat panel with citations, streaming, prompt caching
  - Rubric-based grading for exercises and short-answer quiz questions
  - Practice question generator with an author review queue, `aiGenerated: true` flag, excluded from mock exams until approved
  - Per-user daily token budgets, usage/cost logging table
  - Prompt injection tests, versioned prompts in `/src/ai/prompts/` with fixtures

- **[ ] M5 — Exams and labs**
  - Mock exam engine: timed, domain-weighted question bank, per-domain breakdown, weak-area links back to modules, "check the official exam guide" notice + `lastReviewed`
  - Full `docker-compose.labs.yml` lab content (sample datasets, step-by-step instructions per module)

- **[ ] M6 — Admin**
  - User/role management
  - Content health report (missing items, stale `lastReviewed` > 12 months, open `verify` flags)
  - AI-generated question review queue
  - Question analytics (>70% same-wrong-answer flag)
  - AI usage/cost dashboard

- **[ ] M7 — Content expansion** (one line per batch, `content:validate` + `docs/CONTENT_REVIEW.md` update after each)
  1. AI Engineer
  2. Anthropic Training
  3. Forward Deployed Engineer
  4. PostgreSQL
  5. Cloud Integration (AWS/Azure)
  6. SAP BTP
  7. Implementation Engineer
  8. Deepen existing lines (Enterprise Integration, MuleSoft, Data Engineering, Data Engineering on AWS/Azure)

- **[ ] M8 — Hardening**
  - Security review (headers/CSP, rate limiting, authz per route)
  - Accessibility audit (WCAG 2.2 AA)
  - Performance pass (Core Web Vitals, Lighthouse PWA)
  - `docs/DEPLOYMENT.md` (VPS, Azure Container Apps + Flexible Server, AWS ECS Fargate + RDS)
  - Postgres backup/restore instructions

## Key decisions

See `docs/DECISIONS.md` for the full ADR log. Summary: Drizzle over Prisma, pnpm as the package manager, Auth.js v5 beta, M0 ships stub content scripts/schema replaced in M1, and the health check does a live `select 1`.

## Verifying M0 locally

```bash
cp .env.example .env
docker compose up --build
curl http://localhost:3000/api/health   # expect {"status":"ok",...}
```

or without Docker:

```bash
pnpm install
pnpm lint && pnpm typecheck && pnpm test && pnpm content:validate && pnpm build
```
