# Table Formatter

A zero-dependency CLI utility for converting Markdown tables into **A4-safe, fixed-width ASCII tables** with automatic detection and word wrapping.

This project is designed for **real-world documentation workflows**, particularly where content must transition cleanly from:

> Markdown → Word (`.docx`) → PDF

---

## 🎯 Purpose

Markdown tables often break when exported to Word or PDF due to proportional fonts and layout inconsistencies.

This tool solves that by:

- Converting tables into **monospace-safe ASCII**
- Ensuring **perfect alignment**
- Supporting **A4 print constraints**
- Preserving readability via **word wrapping**

---

## ✨ Features

- Auto-detect Markdown tables in any text
- Convert to fixed-width ASCII tables
- Word-wrap cell content (no truncation)
- Hard-wrap fallback for long tokens (URLs, hashes)
- A4-safe width scaling
- Named presets (`a4`, `compact`, `wide`)
- Optional row borders between every row
- CLI usage across projects (`npm link` or `npm install -g`)
- Clipboard support (`/dev/stdin`)
- Programmatic API via ES module exports
- Zero dependencies

---

## 📦 Install

### From npm

```bash
npm install -g table-formatter
```

### From source

```bash
cd dev-tools/table-formatter
npm link
```

Now available globally:

```bash
format-tables input.md output.txt
```

---

## ⚙️ Usage

### Basic

```bash
format-tables input.md output.txt
```

### Clipboard workflow (recommended)

```bash
pbpaste | format-tables /dev/stdin | pbcopy
```

### Print to stdout instead of a file

```bash
format-tables doc.md --stdout
```

---

## ⚙️ CLI Options

You can customise table output using flags:

```bash
format-tables input.md output.txt --width 80 --padding 1
```

### Available options

| Flag                | Description                          | Default |
| ------------------- | ------------------------------------ | ------- |
| `-w`, `--width`     | Maximum table width (A4 safe)        | `90`    |
| `-p`, `--padding`   | Spaces inside each cell              | `1`     |
| `--preset`          | Named preset: `a4`, `compact`, `wide`| -       |
| `--row-borders`     | Add borders between every row        | off     |
| `--stdout`          | Print to stdout instead of a file    | off     |
| `-h`, `--help`      | Show help message                    | -       |
| `-v`, `--version`   | Show version number                  | -       |

### Presets

| Preset    | Width | Padding |
| --------- | ----- | ------- |
| `a4`      | 90    | 1       |
| `compact` | 72    | 0       |
| `wide`    | 120   | 2       |

Explicit `--width` or `--padding` flags override preset values.

### 💡 Examples

Narrow layout (better for Word):

```bash
format-tables doc.md out.txt --width 80
```

More spacing:

```bash
format-tables doc.md out.txt --padding 2
```

Compact preset:

```bash
format-tables doc.md out.txt --preset compact
```

Row borders for dense tables:

```bash
format-tables doc.md out.txt --row-borders
```

Clipboard workflow with options:

```bash
pbpaste | format-tables /dev/stdin --width 80 | pbcopy
```

---

## 📄 Word / PDF Workflow

1. Run formatter
2. Copy output
3. Paste into Word (**Keep Text Only**)
4. Apply monospace font:
   - `Consolas` or `Courier New`

5. Set line spacing to **Single**
6. Export to PDF if needed

---

## 🔌 Programmatic Usage

The utility modules can be imported directly in ES module projects:

```javascript
import { formatAsciiTable } from "table-formatter/format";
import { autoFormatTables } from "table-formatter/auto";
import { markdownToAscii } from "table-formatter/markdown";

const rows = [
  ["Name", "Role"],
  ["Alice", "Engineer"],
];

const ascii = formatAsciiTable(rows, { maxWidth: 80, padding: 1 });
console.log(ascii);
```

---

## 📁 Project Structure

```text
table-formatter/
├── utils/
│   ├── formatAsciiTable.js
│   ├── autoFormatTables.js
│   └── markdownToAsciiTable.js
│
├── scripts/
│   └── formatDoc.js
│
├── test/
│   ├── formatAsciiTable.test.js
│   ├── autoFormatTables.test.js
│   ├── markdownToAsciiTable.test.js
│   └── cli.test.js
│
├── docs/
│   └── references/
│       └── project-overview.md
│
├── package.json
├── LICENSE
├── CHANGELOG.md
└── README.md
```

---

## 🧪 Testing

```bash
npm test
```

Uses Node.js built-in `node:test` and `node:assert/strict` — zero test dependencies.

---

## 🧠 Design Principles

- Zero dependencies
- Deterministic output
- Plain text only (no binary formats)
- Separation of concerns (`utils` vs `scripts`)
- A4-first formatting
- Simplicity over abstraction

---

## ⚠️ Constraints

- No external libraries unless explicitly justified
- No `.docx` generation
- No framework-specific logic
- No unpredictable formatting behaviour

---

## 🧩 Intended Use

- Developer documentation
- Architecture specs
- Markdown-to-Word workflows
- Multi-project reuse
- Integration into Vue/Nuxt pipelines (optional)

---

## 📏 Output Constraints

- Target width: 80–90 characters (A4 safe)
- Requires monospace font for correct rendering
- Tables must remain aligned across all environments

---

## ✅ Summary

This is a **focused, practical utility** built for reliability over complexity.

It exists to ensure that:

> Tables look exactly the same everywhere — especially in Word and PDF.

---

## 👌 Tip

Fastest workflow:

```bash
pbpaste | format-tables /dev/stdin --width 80 | pbcopy
```

---

## 📝 License

[MIT](LICENSE)
