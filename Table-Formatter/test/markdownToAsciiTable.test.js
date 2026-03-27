import test from "node:test";
import assert from "node:assert/strict";
import { markdownToAscii } from "../utils/markdownToAsciiTable.js";

test("converts a basic Markdown table", () => {
  const md = [
    "| Name | Age |",
    "| --- | --- |",
    "| Alice | 30 |",
  ].join("\n");

  const result = markdownToAscii(md);
  assert.ok(result.startsWith("+"));
  assert.ok(result.includes("Alice"));
  assert.ok(result.includes("30"));
  assert.ok(!result.includes("| ---"), "Markdown separator row should be removed");
});

test("passes options through to formatAsciiTable", () => {
  const md = [
    "| A | B |",
    "| - | - |",
    "| 1 | 2 |",
  ].join("\n");

  const pad0 = markdownToAscii(md, { padding: 0 });
  const pad3 = markdownToAscii(md, { padding: 3 });

  const width0 = pad0.split("\n")[0].length;
  const width3 = pad3.split("\n")[0].length;

  assert.ok(width3 > width0, "padding option should affect output width");
});

test("handles table with leading whitespace on lines", () => {
  const md = [
    "  | X | Y |",
    "  | - | - |",
    "  | a | b |",
  ].join("\n");

  const result = markdownToAscii(md);
  assert.ok(result.includes("a"));
  assert.ok(result.includes("b"));
});
