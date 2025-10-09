export interface IColumn {
  header: string;
  field: string;
  format?: typeFormat;
  params?: string // ! Solo funciona con la propiedad format
  textAling?: typeTextAlign
}

type typeFormat = 'currency' | 'date'
type typeTextAlign = 'left' | 'center' | 'rigth'
