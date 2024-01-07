import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private brands: HttpClient) { }
  private DB_URL = 'http://localhost:3000/brands';

  getBrands() {
    return this.brands.get(this.DB_URL)
  }

}
