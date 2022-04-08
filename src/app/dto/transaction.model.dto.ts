import { Trasaction } from "./transaction.interface.dto";

export class TrasactionModel implements Trasaction {
  constructor(transaction: Trasaction){
    this.id = transaction.id;
    this.type = transaction.type;
    if(['deposit','sell'].includes(transaction.type)) {
      if(transaction.value == 0) 
        this.cashflow = 0;
      else
        this.cashflow = transaction.value;
    }
    else {
      if(transaction.value == 0) 
        this.cashflow = 0;
      else
        this.cashflow = -transaction.value;
    }
    this.value = transaction.value;
    this.date = transaction.date;
    this.security = transaction.security;
    this.shares = transaction.shares;
  }

    id: number;
    type: string;
    cashflow: number;
    value: number;
    date: string;
    security?: string;
    shares?: number;

    transformToModel(transactionData: any) {
      this.type = transactionData.type;
      this.value = transactionData.value;
      this.security = transactionData.security;
      this.shares = transactionData.shares;
      this.type = transactionData.type;
      this.cashflow = transactionData.cashflow;
      return this;
    }
}