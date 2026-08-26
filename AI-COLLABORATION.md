# AI Collaboration Model

This repository uses AI-assisted collaboration as part of product development.

## Why this exists

Public claims about AI collaboration should be verifiable from shipped artefacts.  
This document defines the operating model and evidence trail used in `dev-tools`.

## Collaboration contract

- Human sets direction, scope, and final decisions.
- AI assists with drafting, implementation, quality checks, and documentation.
- Human approves publication to shared/public remotes.
- Significant AI-assisted changes must leave a trace in project metadata or release documentation.

## Proof standard

A change is considered "provable AI collaboration" when the repository contains:

1. a PR or commit record of the change,
2. explicit scope and validation notes,
3. attribution metadata where applicable,
4. a provenance note under `provenance/` for release-level changes.

## Decision ownership

AI can propose and execute within scope.  
Decision authority remains human-owned unless explicitly delegated for a bounded task.

## Where evidence lives

- PR template: `.github/pull_request_template.md`
- Repo structure and attribution rules: `REPO-STRUCTURE.md`
- Release process: `RELEASE-CHECKLIST.md`
- Provenance notes: `provenance/`

## Privacy and security guardrails

- No secrets or private client data in repo history.
- Vulnerability disclosures follow `.github/SECURITY.md`.
- Public artefacts describe outcomes without exposing sensitive operational details.
