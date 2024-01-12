import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  API = 'http://localhost:3000/orders';

  constructor(private http: HttpClient)  { }

  getOrders(userId: number):Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('user.id', userId);
    return this.http.get(`${this.API}`, {params: queryParams})

  }

  AddOrder(newOrder:any):Observable<any> {
    return this.http.post(`${this.API}`,newOrder)
  }

}

