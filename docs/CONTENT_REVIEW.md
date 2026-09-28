# Content review

Tracks every claim across published modules that still needs human verification, per `CLAUDE.md`'s accuracy rules. Each module's own `module.yaml` `verify` list is the source of truth — this file is a rolled-up index for convenience. Regenerate the module-by-module detail by reading each `content/<line>/<module>/module.yaml`'s `verify` array.

## How to use this

1. Open the linked source URL for each item below and confirm the claim is still accurate.
2. If it's still correct, update the module's `lastReviewed` date.
3. If it changed, fix the lesson content and update `verify` and `lastReviewed`.
4. If a whole module is stale (`lastReviewed` over 12 months old), `pnpm content:validate` will flag it as a warning.

## Status

This file is populated after each content batch lands. See each module's `module.yaml` for its current `verify` list — as of the M1 flagship-module batch (2026-09-28), check every module under `/content/*/` for entries.

_Regenerate this list after each `content:validate` run once more modules exist — a script to auto-aggregate `verify` lists across all modules is a good M1 follow-up._
