# Changelog

All notable changes to this repository are documented in this file.

## [0.4.0] - 2026-08-26

### Added in 0.4.0

- Added root `PROJECT-OVERVIEW.md` to track portfolio progress by project.
- Added public/private sync controls:
  - `SYNC-RULES.md`
  - `cursor-workbench/README.md`
- Added new evidence artefacts:
  - `case-study-dev-tools-public-baseline.md`
  - `post-draft-case-study-dev-tools-public-baseline.md`
  - `case-study-employer-client-proof.md`
- Added release collateral:
  - `releases/dev-tools-v0.4.0.md`
  - `releases/v0.4.0-launch-thread.md`

### Changed in 0.4.0

- Strengthened CI pipeline checks:
  - Node version matrix (18 and 20) for `Table-Formatter` workflow,
  - workflow dispatch and concurrency controls,
  - schema parsing and CSV contract checks for toolkit docs workflow.

## [0.3.0] - 2026-08-26

### Added in 0.3.0

- Added `Agent-Planning-Toolkit-Starter` as a new public project.
- Added baseline governance and contribution scaffolding:
  - `.github/SECURITY.md`
  - `.github/pull_request_template.md`
  - issue templates (`bug_report.yml`, `feature_request.yml`)
  - `REPO-STRUCTURE.md`
- Added ownership and automation guardrails:
  - `.github/CODEOWNERS`
  - `.github/dependabot.yml`
  - `.github/workflows/docs-structure-check.yml`

### Changed in 0.3.0

- Updated root `README.md` to reflect mixed project types (CLI tools plus starter frameworks).
- Added governance links and clearer quick-start guidance.

## [0.2.0] - 2026-08-26

### Changed in 0.2.0

- Polished repository framing and navigation.
- Added toolkit entry to the root tools table.

## [0.1.0] - 2026-04-10

### Added in 0.1.0

- Initial `Table-Formatter` project and baseline repo setup.
