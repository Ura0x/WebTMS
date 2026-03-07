import type { MachineData } from '../types/TmTuple';

export function downloadMachineJSON(data: MachineData, filename: string = "maquina.json") {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseMachineJSON(content: string): MachineData | null {
  try {
    const data = JSON.parse(content);
    if (!data.table || !Array.isArray(data.table) || !data.finState) return null;
    return {
      name: data.name || '',
      description: data.description || '',
      table: data.table,
      tape: data.tape || ['>'],
      finState: data.finState,
    };
  } catch {
    return null;
  }
}
