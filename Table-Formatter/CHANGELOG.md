# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-03-27

### Added

- Markdown table auto-detection in full documents
- Fixed-width ASCII table generation with word wrapping
- A4-safe width scaling (`--width`, default 90)
- Adjustable cell padding (`--padding`, default 1)
- Named presets (`--preset a4|compact|wide`)
- Row border option (`--row-borders`)
- Hard-wrap fallback for tokens longer than column width
- Stdout output flag (`--stdout`)
- `--help` and `--version` flags
- CLI input validation with clear error messages
- Clipboard workflow support (`/dev/stdin`)
- Zero external dependencies
- Test suite using Node.js built-in `node:test`
- Programmatic exports for `formatAsciiTable`, `autoFormatTables`, and `markdownToAscii`
