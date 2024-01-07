import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private brands: HttpClient) {}
  private DB_URL = 'https://rstnml-3000.csb.app/brands';

  getBrands() {
    return this.brands.get(this.DB_URL);
  }
}
