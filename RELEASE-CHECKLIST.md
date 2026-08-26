# Release Checklist

Use this checklist before tagging and publishing a repo release.

## 1) Scope and readiness

- [ ] Release scope is explicit (what is in, what is out).
- [ ] Related open work is either completed or deferred in writing.
- [ ] No private data or secrets are included in changed files.

## 2) Validation

- [ ] Run project tests for touched areas.
- [ ] Confirm docs and structure checks pass.
- [ ] Confirm contributor-facing docs still match reality.

## 3) Changelog and notes

- [ ] Update `CHANGELOG.md` with a dated version section.
- [ ] Write a release note in `releases/` describing what changed and why.
- [ ] Add/update a provenance note in `provenance/` for this release.
- [ ] Confirm naming and paths in release notes are correct.

## 4) Git steps

- [ ] Commit release-prep changes.
- [ ] Tag release (`dev-tools-vX.Y.Z`).
- [ ] Push commit and tag.

## 5) Post-release signal

- [ ] Publish release notes or announcement post.
- [ ] Capture one concrete next action for the next iteration.
