import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class categoriesService {

  constructor(private categories: HttpClient) { }
  private DB_URL = 'http://localhost:3000/categories';

  getCategories() {
    return this.categories.get(this.DB_URL)
  }

  getFeaturedCategories() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("_limit", 7);
    return this.categories.get(this.DB_URL, {params: queryParams});
  }
}
