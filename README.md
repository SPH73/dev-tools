# Dev Tools

A growing collection of small, focused CLI tools built for real-world developer workflows. Each tool is zero-dependency, framework-agnostic, and designed to work reliably across projects.

---

## Tools

| Tool | Description | Install |
| ---- | ----------- | ------- |
| [table-formatter](./Table-Formatter) | Convert Markdown tables into A4-safe, fixed-width ASCII tables | `cd Table-Formatter && npm link` |

---

## Philosophy

- Zero external dependencies
- Deterministic, predictable output
- Plain text and CLI-first
- Each tool is self-contained with its own `package.json`, tests, and docs

---

## Usage

Clone the repo, then `npm link` whichever tool you need:

```bash
git clone git@github.com:SPH73/dev-tools.git
cd dev-tools/Table-Formatter
npm link
```

Each tool's own README has full usage instructions.

---

## License

[MIT](./Table-Formatter/LICENSE)
