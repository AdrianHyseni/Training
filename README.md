# Interchange

A learning platform for enterprise integration, MuleSoft, SAP BTP, AWS/Azure integration services, data engineering, PostgreSQL, implementation engineering, forward deployed engineering, AI engineering, and Anthropic/Claude training.

See [`CLAUDE.md`](./CLAUDE.md) for the stack, commands, and conventions, and [`docs/PLAN.md`](./docs/PLAN.md) for the milestone plan.

## Quick start

```bash
cp .env.example .env
docker compose up
```

Then open http://localhost:3000. Mailpit (magic-link emails in dev) is at http://localhost:8025.

## Local (non-Docker) development

```bash
pnpm install
pnpm db:migrate
pnpm content:sync
pnpm dev
```
