import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map, Observable } from 'rxjs';
import { TrasactionModel } from '../dto/transaction.model.dto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  httpOptions = {};

  constructor(private httpClient: HttpClient) { }


  getTransactions(): Observable<TrasactionModel[]> {
    return this.httpClient
    .get<any>(environment.apiUrl,this.httpOptions)
    .pipe(map((data: any) => {
      return data.transactions.map((tr: TrasactionModel) => {
        return new TrasactionModel(tr);
      });
    }));
  }

  createTransaction(transationModel: TrasactionModel): Observable<TrasactionModel> {
    return this.httpClient
    .post<TrasactionModel>(environment.apiUrl,transationModel,this.httpOptions);
  }

  updateTransaction(id: number, transationModel: TrasactionModel): Observable<TrasactionModel> {
    return this.httpClient
    .put<TrasactionModel>(environment.apiUrl+'/'+id,transationModel,this.httpOptions);
  }

  deleteTransaction(id: number): Observable<TrasactionModel> {
    return this.httpClient
    .delete<TrasactionModel>(environment.apiUrl+'/'+id,this.httpOptions);
  }
  
}
