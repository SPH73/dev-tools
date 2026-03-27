export function formatAsciiTable(rows, options = {}) {
  const maxWidth = options.maxWidth || 90;
  const padding = options.padding ?? 1;
  const rowBorders = options.rowBorders || false;

  if (!rows || !rows.length) return "";

  const colCount = Math.max(...rows.map(r => r.length));
  const colWidths = Array(colCount).fill(0);

  // Step 1: determine minimum column widths (longest word)
  rows.forEach(row => {
    row.forEach((cell, i) => {
      const words = String(cell).split(" ");
      const longestWord = Math.max(...words.map(w => w.length));
      colWidths[i] = Math.max(colWidths[i], longestWord);
    });
  });

  // Step 2: scale to fit A4 width
  const totalContentWidth = colWidths.reduce((a, b) => a + b, 0);
  const totalWidth =
    totalContentWidth + colCount * (padding * 2) + colCount + 1;

  if (totalWidth > maxWidth) {
    const scale =
      (maxWidth - (colCount + 1) - colCount * padding * 2) / totalContentWidth;

    for (let i = 0; i < colWidths.length; i++) {
      colWidths[i] = Math.max(10, Math.floor(colWidths[i] * scale));
    }
  }

  // Step 3: word wrap with hard-wrap fallback for long tokens
  const wrapText = (text, width) => {
    const words = String(text).split(" ");
    const lines = [];
    let current = "";

    for (const word of words) {
      if (word.length > width) {
        if (current) {
          lines.push(current);
          current = "";
        }
        for (let j = 0; j < word.length; j += width) {
          lines.push(word.slice(j, j + width));
        }
        continue;
      }

      if ((current + " " + word).trim().length <= width) {
        current = (current + " " + word).trim();
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }

    if (current) lines.push(current);

    return lines.length ? lines : [""];
  };

  // Step 4: build wrapped rows
  const buildRowLines = row => {
    const wrappedCells = row.map((cell, i) =>
      wrapText(cell ?? "", colWidths[i]),
    );

    const maxLines = Math.max(...wrappedCells.map(c => c.length));

    const lines = [];

    for (let i = 0; i < maxLines; i++) {
      const line =
        "|" +
        wrappedCells
          .map((cellLines, colIndex) => {
            const text = cellLines[i] || "";
            return (
              " ".repeat(padding) +
              text.padEnd(colWidths[colIndex], " ") +
              " ".repeat(padding)
            );
          })
          .join("|") +
        "|";

      lines.push(line);
    }

    return lines;
  };

  const makeBorder = () =>
    "+" + colWidths.map(w => "-".repeat(w + padding * 2)).join("+") + "+";

  // Step 5: assemble
  const border = makeBorder();
  let output = "";

  output += border + "\n";
  buildRowLines(rows[0]).forEach(l => (output += l + "\n"));
  output += border + "\n";

  for (let i = 1; i < rows.length; i++) {
    buildRowLines(rows[i]).forEach(l => (output += l + "\n"));
    if (rowBorders && i < rows.length - 1) {
      output += border + "\n";
    }
  }

  output += border;

  return output;
}
