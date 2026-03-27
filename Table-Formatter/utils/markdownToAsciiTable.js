import { formatAsciiTable } from "./formatAsciiTable.js";

export function markdownToAscii(mdTable, options = {}) {
  const lines = mdTable
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.startsWith("|"));

  const rows = lines
    .filter(l => !l.match(/^\|\s*-+/))
    .map(line =>
      line
        .split("|")
        .slice(1, -1)
        .map(cell => cell.trim()),
    );

  return formatAsciiTable(rows, options);
}
