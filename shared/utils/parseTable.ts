export function parseMarkdownTable(markdown: string) {
  const lines = markdown
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('|') && l.endsWith('|'));

  if (lines.length < 2) return { columnDefs: [], rowData: [] };

  // Header row
  const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);

  const columnDefs = headers.map(header => ({
    field: header.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase(),
    headerName: header,
  }));

  // Rows (skip header + separator)
  const rowData = lines.slice(2).map(line => {
    const values = line.split('|').map(v => v.trim()).filter(Boolean);
    const row: any = {};
    headers.forEach((header, i) => {
      const value = values[i] ?? '';
      const num = Number(value.replace(/[$,]/g, ''));
      row[header.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()] =
        !isNaN(num) && value !== '' ? num : value;
    });
    return row;
  });

  return { columnDefs, rowData };
}
