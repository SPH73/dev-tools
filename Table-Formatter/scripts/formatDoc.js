#!/usr/bin/env node

import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { autoFormatTables } from "../utils/autoFormatTables.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(
  fs.readFileSync(resolve(__dirname, "../package.json"), "utf-8"),
);

const PRESETS = {
  a4: { maxWidth: 90, padding: 1 },
  compact: { maxWidth: 72, padding: 0 },
  wide: { maxWidth: 120, padding: 2 },
};

const HELP = `
Usage:
  format-tables <input> [output] [options]

Options:
  -w, --width <number>      Max table width (default: 90)
  -p, --padding <number>    Cell padding (default: 1)
      --preset <name>       Preset: a4 | compact | wide
      --row-borders         Add borders between every row
      --stdout              Print to stdout instead of writing a file
  -h, --help                Show this help message
  -v, --version             Show version number

Examples:
  format-tables doc.md
  format-tables doc.md out.txt
  format-tables doc.md out.txt --width 80
  format-tables doc.md --preset compact --stdout
  pbpaste | format-tables /dev/stdin --width 80 | pbcopy
`;

// ---- Parse args ----
const args = process.argv.slice(2);
const positional = [];

let maxWidth = null;
let padding = null;
let preset = null;
let rowBorders = false;
let toStdout = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === "--help" || arg === "-h") {
    console.log(HELP.trimEnd());
    process.exit(0);
  }

  if (arg === "--version" || arg === "-v") {
    console.log(pkg.version);
    process.exit(0);
  }

  if (arg === "--width" || arg === "-w") {
    maxWidth = parseInt(args[++i], 10);
    if (isNaN(maxWidth)) {
      console.error("Error: --width requires a numeric value");
      process.exit(1);
    }
    continue;
  }

  if (arg === "--padding" || arg === "-p") {
    padding = parseInt(args[++i], 10);
    if (isNaN(padding)) {
      console.error("Error: --padding requires a numeric value");
      process.exit(1);
    }
    continue;
  }

  if (arg === "--preset") {
    preset = args[++i];
    if (!PRESETS[preset]) {
      console.error(
        `Error: unknown preset "${preset}". Valid presets: ${Object.keys(PRESETS).join(", ")}`,
      );
      process.exit(1);
    }
    continue;
  }

  if (arg === "--row-borders") {
    rowBorders = true;
    continue;
  }

  if (arg === "--stdout") {
    toStdout = true;
    continue;
  }

  if (arg.startsWith("-")) {
    console.error(`Error: unknown option "${arg}"`);
    console.log(HELP.trimEnd());
    process.exit(1);
  }

  positional.push(arg);
}

const inputFile = positional[0];
const outputFile = positional[1] || "output.txt";

if (!inputFile) {
  console.log(HELP.trimEnd());
  process.exit(1);
}

// Resolve preset defaults, then allow explicit flags to override
const base = PRESETS[preset] || PRESETS.a4;
if (maxWidth === null) maxWidth = base.maxWidth;
if (padding === null) padding = base.padding;

// ---- Read input ----
const input =
  inputFile === "/dev/stdin"
    ? fs.readFileSync(0, "utf-8")
    : fs.readFileSync(inputFile, "utf-8");

// ---- Process ----
const output = autoFormatTables(input, { maxWidth, padding, rowBorders });

// ---- Output ----
if (toStdout || inputFile === "/dev/stdin") {
  console.log(output);
} else {
  fs.writeFileSync(outputFile, output);
  console.log(`Formatted → ${outputFile}`);
}
