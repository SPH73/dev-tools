import test from "node:test";
import assert from "node:assert/strict";
import { formatAsciiTable } from "../utils/formatAsciiTable.js";

test("returns empty string for empty input", () => {
  assert.equal(formatAsciiTable([]), "");
  assert.equal(formatAsciiTable(null), "");
  assert.equal(formatAsciiTable(undefined), "");
});

test("formats a single-row table (header only)", () => {
  const result = formatAsciiTable([["Name", "Age"]]);
  assert.ok(result.startsWith("+"));
  assert.ok(result.includes("| Name"));
  assert.ok(result.includes("| Age"));
});

test("formats a multi-row table", () => {
  const rows = [
    ["Name", "Role"],
    ["Alice", "Engineer"],
    ["Bob", "Designer"],
  ];
  const result = formatAsciiTable(rows);
  const lines = result.split("\n");

  assert.equal(lines[0], lines[2], "header border matches separator border");
  assert.equal(lines[0], lines[lines.length - 1], "top and bottom borders match");
  assert.ok(lines[1].includes("Name"));
  assert.ok(lines[3].includes("Alice"));
});

test("wraps long cell content", () => {
  const rows = [
    ["Title", "Description"],
    ["Test", "This is a very long description that should wrap across multiple lines"],
  ];
  const result = formatAsciiTable(rows, { maxWidth: 50 });
  const lines = result.split("\n");
  const dataLines = lines.filter(l => l.startsWith("|") && !l.includes("Title"));

  assert.ok(dataLines.length > 1, "long content should produce multiple lines");
});

test("hard-wraps tokens longer than column width", () => {
  const longToken = "abcdefghijklmnopqrstuvwxyz1234567890";
  const rows = [
    ["Key", "Value"],
    ["hash", longToken],
  ];
  const result = formatAsciiTable(rows, { maxWidth: 40 });

  assert.ok(!result.includes(longToken), "full token should not appear on one line");
});

test("respects custom maxWidth", () => {
  const rows = [
    ["A", "B", "C"],
    ["one", "two", "three"],
  ];
  const result60 = formatAsciiTable(rows, { maxWidth: 60 });
  const result40 = formatAsciiTable(rows, { maxWidth: 40 });

  const width60 = result60.split("\n")[0].length;
  const width40 = result40.split("\n")[0].length;

  assert.ok(width60 >= width40, "wider maxWidth should produce wider or equal table");
});

test("respects custom padding", () => {
  const rows = [
    ["A", "B"],
    ["x", "y"],
  ];
  const pad0 = formatAsciiTable(rows, { padding: 0 });
  const pad2 = formatAsciiTable(rows, { padding: 2 });

  const width0 = pad0.split("\n")[0].length;
  const width2 = pad2.split("\n")[0].length;

  assert.ok(width2 > width0, "higher padding should produce wider table");
});

test("adds row borders when rowBorders option is true", () => {
  const rows = [
    ["Name", "Role"],
    ["Alice", "Engineer"],
    ["Bob", "Designer"],
  ];
  const withBorders = formatAsciiTable(rows, { rowBorders: true });
  const withoutBorders = formatAsciiTable(rows, { rowBorders: false });

  const borderCount = (str) => str.split("\n").filter(l => l.startsWith("+")).length;

  assert.ok(
    borderCount(withBorders) > borderCount(withoutBorders),
    "rowBorders should add extra border lines",
  );
});

test("handles cells with undefined or null values", () => {
  const rows = [
    ["A", "B"],
    [null, undefined],
  ];
  const result = formatAsciiTable(rows);
  assert.ok(result.includes("|"), "should produce valid table output");
});
