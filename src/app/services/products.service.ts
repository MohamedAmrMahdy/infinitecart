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
    return new Observable(subscriber => {
        this.products.get(this.DB_URL+'products')

          .subscribe(res => {
              subscriber.next(res)
              subscriber.complete()
          })
    })
}

getAllListedProducts(): Observable<any> {
  return new Observable(subscriber => {
      this.products.get(this.DB_URL+'listed_products')

        .subscribe(res => {
            subscriber.next(res)
            subscriber.complete()
        })
  })
}

getAllSellers(): Observable<any> {
  return new Observable(subscriber => {
      this.products.get(this.DB_URL+'sellers')

        .subscribe(res => {
            subscriber.next(res)
            subscriber.complete()
        })
  })
}

getProductById(id:number): Observable<any> {
  return new Observable(subscriber => {
      this.products.get(this.DB_URL+'products/'+ id)

        .subscribe(res => {
            subscriber.next(res)
            subscriber.complete()
        })
  })
}

getListedProductById(id:number): Observable<any> {
  return new Observable(subscriber => {
      this.products.get(this.DB_URL+'listed_products/'+id)

        .subscribe(res => {
            subscriber.next(res)
            subscriber.complete()
        })
  })
}

getSellerById(id:number): Observable<any> {
  return new Observable(subscriber => {
      this.products.get(this.DB_URL+'sellers/'+id)

        .subscribe(res => {
            subscriber.next(res)
            subscriber.complete()
        })
  })
}

getProductSellers(productId: number): Observable<any[]> {
  return this.products.get<any[]>(this.DB_URL + 'listed_products').pipe(
    map(products => products.filter(product => product.product_id === productId))
  );
}

}
