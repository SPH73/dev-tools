# Publish in `dev-tools` (Copy/Paste)

Run these commands from the monorepo root:

```bash
cd ~/work/Development/Projects/dev-tools
git status --short --branch
git add README.md Agent-Planning-Toolkit-Starter
git commit -m "feat: add agent planning toolkit starter"
git push origin Main
```

Optional tag for toolkit inclusion release:

```bash
git tag dev-tools-v0.2.0
git push origin dev-tools-v0.2.0
```
