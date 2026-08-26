# Sync Rules: `dev-tools` <-> `FF27/10-delta`

This document keeps public and private work cleanly separated.

## Source-of-truth boundary

- Public source of truth: `Development/Projects/dev-tools`
- Private drafting and IP substrate: `FF27/10-delta`

## What belongs where

### `dev-tools` (public)

- Share-safe toolkits and templates.
- Governance, release, provenance, and evidence artefacts.
- Outcome-focused case studies and post drafts that reveal no private method or client-sensitive detail.

### `FF27/10-delta` (private)

- Raw ideation and exploratory drafts.
- Method-development notes and internal planning iterations.
- Any material that could expose private IP, client context, or unfinished internal logic.

## Promotion rule (private -> public)

Only promote artefacts from `FF27/10-delta` to `dev-tools` when all checks pass:

1. Share-safe content (no private IP/client identifiers/secrets).
2. Outcome-first wording (no method exposure).
3. Clear folder destination in `dev-tools`.
4. Validation pass after copy (links, structure checks, tests where relevant).

## Working intake in `dev-tools`

Use `cursor-workbench/` as the public-facing staging area for share-safe imports that are not yet productised.

## Current mapping for this initiative

- Public toolkit home:
  - `dev-tools/Agent-Planning-Toolkit-Starter/`
- Private draft reservoir:
  - `FF27/10-delta/cursor/codex-5-3/`

If in doubt, keep it private first and promote later.
