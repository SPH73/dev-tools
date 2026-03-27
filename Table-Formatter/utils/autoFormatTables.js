import { formatAsciiTable } from "./formatAsciiTable.js";

export function autoFormatTables(content, options = {}) {
  const lines = content.split("\n");
  const output = [];

  let buffer = [];
  let inTable = false;

  const isTableLine = line => /^\s*\|.*\|\s*$/.test(line);
  const isSeparator = line => /^\s*\|\s*-+/.test(line);

  const flushTable = () => {
    if (!buffer.length) return;

    const rows = buffer
      .filter(l => !isSeparator(l))
      .map(line =>
        line
          .trim()
          .split("|")
          .slice(1, -1)
          .map(cell => cell.trim()),
      );

    output.push(formatAsciiTable(rows, options));
    buffer = [];
  };

  for (const line of lines) {
    if (isTableLine(line)) {
      inTable = true;
      buffer.push(line);
    } else {
      if (inTable) {
        flushTable();
        inTable = false;
      }
      output.push(line);
    }
  }

  if (inTable) flushTable();

  return output.join("\n");
}
