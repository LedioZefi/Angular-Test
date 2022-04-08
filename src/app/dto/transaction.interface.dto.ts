export interface Trasaction {
    id: number;
    type: string;
    cashflow: number;
    value: number,
    date: string,
    security?: string,
    shares?: number
  }