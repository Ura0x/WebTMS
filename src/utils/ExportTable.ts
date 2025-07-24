export function exportTableAsCSV(table: string[][], filename: string = "tabela.csv") {
  const csvContent = table.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Boa prática: liberar o objeto depois
  URL.revokeObjectURL(url);
}
