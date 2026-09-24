# Sync Rules: `dev-tools` <-> `FF27/10-delta`

This document keeps public and private work cleanly separated.

## Source-of-truth boundary

- Public source of truth: `Development/dev-tools` *(corrected 2026-09-24: the path `Development/Projects/dev-tools` recorded here was wrong; the repo is at `Development/dev-tools/`, verified on disk. `dev-tools/CLAUDE.md` still carries the old path and is NOT corrected here.)*
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
5. **The promoted artefact carries a `## Share-safe statement` section.** It states, in the artefact's own terms, what the artefact reports and what it deliberately leaves out. The established form, from `Agent-Planning-Toolkit-Starter/evidence/case-study-employer-client-proof.md`, is one sentence: *"This case study reports intent and outcomes only. It intentionally excludes private methods, internal IP details, and client-sensitive context."* Adapt the nouns, keep the shape: what it is, what it covers, what it excludes. **A promoted artefact without this section has not passed promotion, whatever else it satisfies.**

> **Which denylist check 1 is run against, and it is not the one published beside the guard.** The identity guard ships with an EXAMPLE denylist, so that a reader can verify the pattern rather than the contents. **A pass against the example list proves nothing about a real identifier**, and it reports `clean` exactly as a real pass does. A promotion sweep runs the guard against the real hashed denylist, which is held privately and is never published. **If you cannot say which list your run used, the check has not been performed.** The real list's location is recorded privately, in this repository's gitignored `CLAUDE.md`. *Added 2026-09-24.*

> **Why check 5 is written here, and the date it was missing.** This rule was agreed 2026-08-27 and recorded in three documents — `~/work/CLAUDE.md`, `REPOS.md`, and `dev-tools/CLAUDE.md` §1 — each of which names *this file* as its single home and states that it owns five checks. **It was never written into this file.** Found 2026-09-24 while standing up `pix-harness`, which carried the statement correctly by copying the example rather than by reading the rule. **Three pointers resolving to an empty home is a rule that looks enforced and is not.** Written in on Pix's ruling, 2026-09-24.

## Names: the allow list and the deny list

**What these lists govern.** Names, not vocabulary: makers, customers, employers, persons, product names, project names, document identifiers. An ordinary English word is not a name and is not covered.

**The default, in one sentence: a name on neither list is an ASK, not a pass.** This mirrors the publication default reversed on 2026-09-22, where a repo without an explicit permission may not be published. Silence is a no here too.

### The allow list

Plaintext, tracked, and editable by hand. Naming what is permitted in public leaks nothing, because every entry is already published. Do not mirror the deny list's hashing onto it out of symmetry: the two lists have opposite properties.

| Name | Already public in |
|---|---|
| Sue Holder | `Agent-Planning-Toolkit-Starter/LICENSE`, `Agent-Planning-Toolkit-Starter/toolkit/spec.md`, and the `pix-harness` licence and README |
| Pix | the `pix-harness` repository name |
| SPH73 | the owner of both public repositories, and this repository's clone URL in `README.md` |
| dev-tools | this repository |
| pix-harness | the second public repository |
| Table-Formatter | a tool in this repository |
| Agent-Planning-Toolkit-Starter | a toolkit in this repository |
| check-identity.sh | the identity guard published in `pix-harness` |
| Design Develop Host | her own trading name, published by her outside these repositories |

**Seeded 2026-09-24 from what is already in the two public repositories, not from what might one day be wanted.** A name earns a row by having been published, never by looking harmless. A third party who has published the material themselves may be added on the same basis, citing where they published it.

### The deny list

**It stays where it is: hashed, inside the guard that enforces it.** It is not moved here, copied here or restated here. A guard that names what it blocks is itself the leak, which is why it carries only `<length> <sha256>` pairs.

### What an ask looks like, and what a yes does

**The ask goes to Pix. Nobody else rules on a name.**

A **yes** adds the name to the table above in the same sitting, with the place it is already public. That entry is the point of the list: it is what stops the same name being asked about twice.

A **no** needs no entry. The default already refuses an unlisted name, and a name that must be actively blocked rather than merely unlisted belongs in the deny list, not here.

## Working intake in `dev-tools`

Use `cursor-workbench/` as the public-facing staging area for share-safe imports that are not yet productised.

## Current mapping for this initiative

- Public toolkit home:
  - `dev-tools/Agent-Planning-Toolkit-Starter/`
- Private draft reservoir:
  - `FF27/10-delta/cursor/agents/`

If in doubt, keep it private first and promote later.
