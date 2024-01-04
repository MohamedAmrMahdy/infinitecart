import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})


export class ProductsService{

  constructor(private products:HttpClient) { }
  private DB_URL = 'http://localhost:3000/products';

  getProductsByCategory(category:string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("product.category.name", category);
    queryParams = queryParams.append("_limit", 10);
    return this.products.get(this.DB_URL, {params: queryParams});
  }
  getProducts(): Observable<any> {
    return this.products.get(this.DB_URL)
  }


}
