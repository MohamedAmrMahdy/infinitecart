import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})


export class ProductsService{

  constructor(private products:HttpClient) { }
  private DB_URL = 'http://localhost:3000/';

  getProducts(): Observable<any> {
    return this.products.get(this.DB_URL+'products')
  }


}
