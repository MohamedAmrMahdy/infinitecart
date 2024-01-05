import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { IProduct } from '../interfaces/product';

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
    let queryParams = new HttpParams();
    queryParams = queryParams.append("_limit", 100);
    return this.products.get(this.DB_URL, {params: queryParams})
  }

  getProductsByName(name:string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("product.title_like", name);
    // queryParams = queryParams.append("_limit", 10); // uncomment if you want to get limited amount of results.
    return this.products.get(this.DB_URL, {params: queryParams});
  }

  getProductById(id:number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.products.get(this.DB_URL, {params: queryParams});
  }

  getProductsById(id:number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("product.id", id);
    return this.products.get(this.DB_URL, {params: queryParams});
  }

  getProductsByPrice(start:number,end:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("price_gte",start);
    queryParams = queryParams.append("price_lte",end);
    return this.products.get(this.DB_URL, {params: queryParams});
  }

  getAllProductsByCategory(category:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("product.category.name", category);
    queryParams = queryParams.append("product.category.name_like",category);
    return this.products.get(this.DB_URL, {params: queryParams});
  }

  getProductsBySeller(seller:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("seller.name",seller);
    queryParams = queryParams.append("seller.name_like",seller);
    return this.products.get(this.DB_URL, {params: queryParams});
  }

  getProductsByBrand(brand:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("product.brand.name",brand);
    queryParams = queryParams.append("product.brand.name_like",brand);
    return this.products.get(this.DB_URL, {params: queryParams});
  }
  getProducts1(): Observable<IProduct[]> {
    return this.products.get<IProduct[]>(this.DB_URL)
  }

}
