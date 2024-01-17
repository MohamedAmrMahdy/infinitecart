import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class categoriesService {

  constructor(private categories: HttpClient) { }

  getCategories() {
    return this.categories.get(environment.AUTH_API + 'categories')
  }

  getFeaturedCategories() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("_limit", 7);
    return this.categories.get(environment.AUTH_API + 'categories', {params: queryParams});
  }
}
