export const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setTable: React.Dispatch<React.SetStateAction<string[][]>>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const content = reader.result as string;

    if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
      const lines = content.split('\n').map(line => line.trim());
      const table = lines.map(line => line.split(','));
      //console.log('Tabela carregada:', table);
      setTable(table); // agora de verdade
    } else {
      console.warn('Tipo de arquivo não suportado');
    }
  };

  reader.readAsText(file);
};