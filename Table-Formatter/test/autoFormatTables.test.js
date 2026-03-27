import test from "node:test";
import assert from "node:assert/strict";
import { autoFormatTables } from "../utils/autoFormatTables.js";

test("converts a single Markdown table", () => {
  const md = [
    "| Name | Role |",
    "| --- | --- |",
    "| Alice | Engineer |",
  ].join("\n");

  const result = autoFormatTables(md);
  assert.ok(result.startsWith("+"), "should start with a border");
  assert.ok(result.includes("Alice"));
  assert.ok(!result.includes("| ---"), "Markdown separator row should be removed");
});

test("preserves non-table text", () => {
  const md = [
    "# Heading",
    "",
    "Some paragraph text.",
    "",
    "| A | B |",
    "| - | - |",
    "| 1 | 2 |",
    "",
    "Footer text.",
  ].join("\n");

  const result = autoFormatTables(md);
  assert.ok(result.includes("# Heading"));
  assert.ok(result.includes("Some paragraph text."));
  assert.ok(result.includes("Footer text."));
  assert.ok(result.includes("+"), "table should be converted");
});

test("handles multiple tables in one document", () => {
  const md = [
    "| A | B |",
    "| - | - |",
    "| 1 | 2 |",
    "",
    "Middle text.",
    "",
    "| X | Y |",
    "| - | - |",
    "| 3 | 4 |",
  ].join("\n");

  const result = autoFormatTables(md);
  const borders = result.split("\n").filter(l => l.startsWith("+"));
  assert.ok(borders.length >= 6, "should have borders from two tables");
  assert.ok(result.includes("Middle text."));
});

test("passes options through to formatAsciiTable", () => {
  const md = [
    "| A | B |",
    "| - | - |",
    "| 1 | 2 |",
  ].join("\n");

  const wide = autoFormatTables(md, { maxWidth: 120 });
  const narrow = autoFormatTables(md, { maxWidth: 30 });

  const wideWidth = wide.split("\n")[0].length;
  const narrowWidth = narrow.split("\n")[0].length;

  assert.ok(wideWidth >= narrowWidth, "options should affect table width");
});

test("handles document with no tables", () => {
  const md = "Just plain text.\nNo tables here.";
  const result = autoFormatTables(md);
  assert.equal(result, md, "non-table text should pass through unchanged");
});
