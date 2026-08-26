# Agent Planning Toolkit Starter

Reusable starter assets for structured, high-quality planning with AI agents.

This toolkit helps you run planning work with consistent inputs, explicit contracts, and clear review gates.

## What this is

- A schema-first intake for planning context.
- A prompt template that maps intake fields to generated output.
- An output contract that enforces section-level quality.
- A sample intake row to get started quickly.
- Operator guidance for gated, reviewable delivery.

## Folder structure

```text
Agent-Planning-Toolkit-Starter/
  README.md
  LICENSE
  CONTRIBUTING.md
  ROADMAP.md
  toolkit/
    goal.md
    spec.md
    intake.schema.json
    prompt-template.txt
    output-contract.md
  examples/
    sample-intake.csv
  playbooks/
    operator-playbook.md
  docs/
    publish-in-dev-tools.md
    first-public-announcement.md
```

## Quick start

1. Review `toolkit/goal.md` for scope and success criteria.
2. Fill `examples/sample-intake.csv` for your project.
3. Validate intake against `toolkit/intake.schema.json`.
4. Generate your prompt from `toolkit/prompt-template.txt`.
5. Evaluate output against `toolkit/output-contract.md`.
6. Apply gating and review flow from `playbooks/operator-playbook.md`.

## Helpful docs

- Publishing updates in this monorepo: `docs/publish-in-dev-tools.md`
- First public launch copy: `docs/first-public-announcement.md`

## Gating discipline

Use this operating rule across all runs:

- keep ungated and gated work separate,
- do not implement gated work before explicit unblock,
- document known gaps and next actions.
