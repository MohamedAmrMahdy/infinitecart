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

  getProductsByName(name:string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("product.title_like", name);
    // queryParams = queryParams.append("_limit", 10); // uncomment if you want to get limited amount of results.
    return this.products.get(this.DB_URL, {params: queryParams});
  }


}
