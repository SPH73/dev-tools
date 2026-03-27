# Table Formatter — Project Overview

## What It Does

Table Formatter is a zero-dependency CLI tool that converts Markdown-style tables into fixed-width, A4-safe ASCII tables with auto-detection and word wrapping.

It exists because Markdown tables do not render reliably in Word or PDF. This tool ensures consistent alignment, print-safe formatting, and predictable output across environments.

---

## Architecture

```text
table-formatter/
├── utils/
│   ├── formatAsciiTable.js        # Core formatting engine (column sizing, wrapping, borders)
│   ├── autoFormatTables.js        # Detects and converts tables within full documents
│   └── markdownToAsciiTable.js    # Single-table conversion helper
│
├── scripts/
│   └── formatDoc.js               # CLI entry point (arg parsing, file I/O)
│
├── test/
│   ├── formatAsciiTable.test.js   # Core formatter tests
│   ├── autoFormatTables.test.js   # Document-level conversion tests
│   ├── markdownToAsciiTable.test.js # Single-table helper tests
│   └── cli.test.js                # CLI integration tests
│
├── docs/
│   └── references/
│       └── project-overview.md    # This file
│
├── package.json                   # CLI config, exports, npm metadata
├── LICENSE                        # MIT license
├── CHANGELOG.md                   # Version history
├── .gitignore                     # Excludes node_modules, output.txt, logs
└── README.md                      # Usage + documentation
```

### Module Responsibilities

| Module                    | Role                                                        |
| ------------------------- | ----------------------------------------------------------- |
| `formatAsciiTable.js`     | Pure function. Takes parsed rows + options, returns ASCII.  |
| `autoFormatTables.js`     | Scans text for Markdown tables, replaces them with ASCII.   |
| `markdownToAsciiTable.js` | Convenience wrapper for converting a single Markdown table. |
| `formatDoc.js`            | CLI shell. Parses args, reads input, writes output.         |

---

## Data Flow

```text
Input text (file or stdin)
  → autoFormatTables(content, options)
    → regex detects Markdown table blocks
    → each block parsed into rows (array of arrays)
    → formatAsciiTable(rows, options)
      → column widths calculated (longest word per column)
      → widths scaled to fit maxWidth (A4 constraint)
      → cells word-wrapped (with hard-wrap fallback for long tokens)
      → ASCII table assembled with borders
    → ASCII table replaces original Markdown block
  → output text (file or stdout)
```

---

## CLI Interface

```bash
format-tables <input> [output] [options]
```

| Flag              | Description                            | Default |
| ----------------- | -------------------------------------- | ------- |
| `-w`, `--width`   | Maximum table width (A4 safe)          | `90`    |
| `-p`, `--padding` | Spaces inside each cell                | `1`     |
| `--preset`        | Named preset: `a4`, `compact`, `wide`  | -       |
| `--row-borders`   | Add borders between every row          | off     |
| `--stdout`        | Print to stdout instead of a file      | off     |
| `-h`, `--help`    | Show help message                      | -       |
| `-v`, `--version` | Show version number                    | -       |

### Presets

| Preset    | Width | Padding |
| --------- | ----- | ------- |
| `a4`      | 90    | 1       |
| `compact` | 72    | 0       |
| `wide`    | 120   | 2       |

Explicit `--width`/`--padding` flags override preset values.

When input is `/dev/stdin`, output goes to stdout (for piping).
Otherwise, output writes to the specified file (default: `output.txt`).

---

## Programmatic API

The package exports three entry points via the `exports` field in `package.json`:

```javascript
import { formatAsciiTable } from "table-formatter/format";
import { autoFormatTables } from "table-formatter/auto";
import { markdownToAscii } from "table-formatter/markdown";
```

All functions accept an `options` object with `maxWidth`, `padding`, and `rowBorders`.

---

## Core Formatting Logic

`formatAsciiTable` operates in five steps:

1. **Column width calculation** — minimum width per column based on the longest word in each column.
2. **A4 scaling** — if the total table width exceeds `maxWidth`, column widths are proportionally scaled down (minimum 10 characters per column).
3. **Word wrapping** — cell content is wrapped to fit the calculated column width. Tokens longer than the column width are hard-wrapped into chunks. No truncation.
4. **Row assembly** — multi-line cells are padded vertically so all columns in a row align.
5. **Border generation** — `+---+---+` style borders at top, after header, and at bottom. Optional `rowBorders` inserts a border between every data row.

---

## Testing

```bash
npm test
```

Uses Node.js built-in `node:test` and `node:assert/strict` (zero dependencies). The `prepublishOnly` script runs the test suite before every `npm publish`.

---

## Constraints

- Zero external dependencies
- Deterministic output (same input always produces same output)
- Plain text only (no binary formats, no `.docx` generation)
- Monospace font assumed for correct rendering
- Target width: 80–90 characters (A4 safe at 10–12pt Consolas/Courier New)

---

## Intended Use Cases

- Developer documentation pipelines
- Markdown → Word → PDF workflows
- Clipboard-based formatting (`pbpaste | format-tables /dev/stdin | pbcopy`)
- Reuse across multiple projects via `npm link` or `npm install -g`
- Programmatic use in Node.js scripts
- Integration into Vue/Nuxt environments (non-blocking)
