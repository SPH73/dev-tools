import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI = resolve(__dirname, "../scripts/formatDoc.js");

const run = (args, input) => {
  const opts = { encoding: "utf-8" };
  if (input) opts.input = input;
  return execFileSync("node", [CLI, ...args], opts);
};

const runFail = (args, input) => {
  try {
    run(args, input);
    assert.fail("Expected command to fail");
  } catch (err) {
    return err;
  }
};

test("--help prints usage and exits 0", () => {
  const out = run(["--help"]);
  assert.ok(out.includes("Usage:"));
  assert.ok(out.includes("--width"));
});

test("-h prints usage and exits 0", () => {
  const out = run(["-h"]);
  assert.ok(out.includes("Usage:"));
});

test("--version prints version number", () => {
  const out = run(["--version"]).trim();
  assert.match(out, /^\d+\.\d+\.\d+$/);
});

test("exits with error when no input file given", () => {
  const err = runFail([]);
  assert.equal(err.status, 1);
});

test("exits with error for non-numeric --width", () => {
  const err = runFail(["/dev/stdin", "--width", "abc"]);
  assert.equal(err.status, 1);
  assert.ok(err.stderr.includes("--width requires a numeric value"));
});

test("exits with error for non-numeric --padding", () => {
  const err = runFail(["/dev/stdin", "--padding", "xyz"]);
  assert.equal(err.status, 1);
  assert.ok(err.stderr.includes("--padding requires a numeric value"));
});

test("exits with error for unknown preset", () => {
  const err = runFail(["/dev/stdin", "--preset", "huge"]);
  assert.equal(err.status, 1);
  assert.ok(err.stderr.includes("unknown preset"));
});

test("exits with error for unknown flag", () => {
  const err = runFail(["/dev/stdin", "--bogus"]);
  assert.equal(err.status, 1);
  assert.ok(err.stderr.includes("unknown option"));
});

test("reads from stdin and writes to stdout", () => {
  const md = "| A | B |\n| - | - |\n| 1 | 2 |\n";
  const out = run(["/dev/stdin"], md);
  assert.ok(out.includes("+"));
  assert.ok(out.includes("1"));
});

test("--stdout flag sends output to stdout for file input", () => {
  const md = "| X | Y |\n| - | - |\n| a | b |\n";
  const out = run(["/dev/stdin", "--stdout"], md);
  assert.ok(out.includes("a"));
});

test("--preset compact produces narrower output", () => {
  const md = "| A | B | C |\n| - | - | - |\n| one | two | three |\n";
  const wide = run(["/dev/stdin", "--preset", "wide"], md);
  const compact = run(["/dev/stdin", "--preset", "compact"], md);

  const wideWidth = wide.split("\n")[0].length;
  const compactWidth = compact.split("\n")[0].length;

  assert.ok(wideWidth >= compactWidth, "wide preset should be wider than compact");
});

test("explicit --width overrides preset", () => {
  const md = "| A | B |\n| - | - |\n| 1 | 2 |\n";
  const out = run(["/dev/stdin", "--preset", "wide", "--width", "40"], md);
  const width = out.split("\n")[0].length;
  assert.ok(width <= 40, "explicit --width should override preset");
});
