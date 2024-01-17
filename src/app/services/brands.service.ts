import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private brands: HttpClient) { }

  getBrands() {
    return this.brands.get(environment.AUTH_API + 'brands')
  }

}
