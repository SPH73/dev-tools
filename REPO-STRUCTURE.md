# Repo Structure Contract

This document defines what belongs in `dev-tools` and how projects should be structured.

## Purpose

`dev-tools` is a public monorepo for small, practical developer tools and reusable starter frameworks.

## Folder Taxonomy

- `Table-Formatter/`: executable CLI tools with tests.
- `Agent-Planning-Toolkit-Starter/`: documentation-first starter frameworks.

Future additions should follow one of these project types:

1. **CLI tool project**
2. **Starter toolkit/framework project**

## Naming Conventions

- Use `Title-Case` folder names at repo root for project directories.
- Use lowercase kebab-case for command names and package names unless ecosystem constraints require otherwise.

## Required Files Per Project

Every project folder should include:

- `README.md` (what it is, who it is for, quick start)
- `LICENSE` (or explicit link to root license policy)
- `ROADMAP.md` or equivalent next-steps document

Project-specific additions:

- CLI tools: runnable scripts + tests + package manifest
- Toolkits: templates/contracts/examples/playbooks where applicable

## Contribution and Governance

- Use issue templates in `.github/ISSUE_TEMPLATE/`.
- Use the PR template in `.github/pull_request_template.md`.
- Follow security reporting guidance in `.github/SECURITY.md`.
- Ownership and review routing are defined in `.github/CODEOWNERS`.
- Dependency and GitHub Actions update hygiene is managed by `.github/dependabot.yml`.

## Scope Guard

Do not add:

- private client data,
- credentials or secrets,
- unrelated experiments without a project README and declared intent.
