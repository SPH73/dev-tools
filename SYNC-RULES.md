# Sync Rules: `dev-tools` <-> the private substrate

This document keeps public and private work cleanly separated.

## Source-of-truth boundary

- Public source of truth: this repository.
- Private drafting and IP substrate: a separate private repository outside this one.

**The private repository is not named here, and that is deliberate.** This file is public, so naming a
private path publishes the existence, codename and structure of private work for no benefit to any
reader of this repo. The actual mapping lives in this repo's local-only `CLAUDE.md`.

*Genericised 2026-08-27. The earlier version named the private path in five places and had already been
pushed, so the names remain in this repo's history: a public-from-creation repo has no private original
to sanitise, and nothing published here can be withdrawn later. Recorded so the cost is legible rather
than repeated.*

## What belongs where

### `dev-tools` (public)

- Share-safe toolkits and templates.
- Governance, release, provenance, and evidence artefacts.
- Outcome-focused case studies and post drafts that reveal no private method or client-sensitive detail.

### The private substrate

- Raw ideation and exploratory drafts.
- Method-development notes and internal planning iterations.
- Any material that could expose private IP, client context, or unfinished internal logic.

## Promotion rule (private -> public)

Only promote artefacts from the private substrate into this repo when all checks pass:

1. Share-safe content (no private IP/client identifiers/secrets).
2. Outcome-first wording (no method exposure).
3. Clear folder destination in `dev-tools`.
4. Validation pass after copy (links, structure checks, tests where relevant).
5. **The artefact carries a `## Share-safe statement` of its own.** House rule, added 2026-08-27. See below.

## Share-safe statements are required, not optional

**Every artefact promoted into `dev-tools` ends with a `## Share-safe statement` naming what it deliberately excludes.** The exemplar is already in the repo, at `Agent-Planning-Toolkit-Starter/evidence/case-study-employer-client-proof.md`:

> This case study reports intent and outcomes only. It intentionally excludes private methods, internal IP details, and client-sensitive context.

**Why it is a rule and not a nicety.** Check 1 above is a judgement somebody makes once, at promotion, and then it evaporates. A statement carried inside the artefact is a **claim that travels with the file**, so the next reader inherits the answer instead of re-deriving it. It also makes the exclusion **checkable**: a reviewer can test the file against its own stated boundary rather than against their guess at one.

**Write it specific.** Name the categories actually withheld (methods, client identity, pricing, internal reasoning), not a generic reassurance. A statement that says nothing in particular is worse than none, because it looks like diligence.

**This cuts both ways, which is the point.** If an artefact cannot honestly carry one, it is not ready to be promoted. That is the rule doing its job at the moment it is cheapest.

*Origin, recorded so the rule is not mistaken for boilerplate: on 2026-08-27 an agent flagged that same case-study file as a possible client-consent exposure, having judged it from its filename without opening it. The file had answered the question itself, in this exact form. Pix ruled the pattern a house rule the same day.*

## Working intake in `dev-tools`

Use `cursor-workbench/` as the public-facing staging area for share-safe imports that are not yet productised.

## Current mapping for this initiative

- Public toolkit home:
  - `Agent-Planning-Toolkit-Starter/` in this repo.
- Private draft reservoir:
  - Recorded in the local-only `CLAUDE.md`, not here.

If in doubt, keep it private first and promote later.
