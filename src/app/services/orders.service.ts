import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient)  { }

  getOrders(userId: number):Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('user.id', userId);
    return this.http.get(environment.AUTH_API + 'orders/', {params: queryParams})

  }

  AddOrder(newOrder:any):Observable<any> {
    return this.http.post(environment.AUTH_API + 'orders/',newOrder)
  }

}

