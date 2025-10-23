export interface IColumn {
  header: string;
  field: string;
  format?: IFormat;
  operation?: IOperation;
}

interface IFormat {
  type: typeFormat;
  params?: string // ! Solo funciona con la propiedad format
}

type typeFormat = 'currency' | 'date'


export interface IAccionOutput<T> {
  type: typeAccionOutput
  data: T
}

export type typeAccionOutput = 'editable' | 'delete'

export interface IFooter {
  label?: string;
  colspan: number;
  format?: IFormat;
  operation?: IOperation;
}

export interface IOperation {
  columns?: (string | number)[]
}



export interface IValues {
  tag: string
  value: any
}

