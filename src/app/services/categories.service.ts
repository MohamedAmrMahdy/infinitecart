import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class categoriesService {
  constructor(private categories: HttpClient) {}
  private DB_URL = 'https://rstnml-3000.csb.app/categories';

  getCategories() {
    return this.categories.get(this.DB_URL);
  }

  getFeaturedCategories() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('_limit', 7);
    return this.categories.get(this.DB_URL, { params: queryParams });
  }
}
