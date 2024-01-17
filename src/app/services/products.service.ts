import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ProductsService{

  constructor(private products:HttpClient) { }

  getAllProducts(
    {
      start,
      limit,
      metaId,
      productId,
      titleLike,
      category,
      categoryLike,
      brandLike,
      sellerLike,
      minPrice,
      maxPrice,
      search,
      sorting,
    }: {
      start?: number;
      limit?: number;
      metaId?: number;
      productId?: number;
      titleLike?: string;
      category?: string;
      categoryLike?: string;
      brandLike?: string;
      sellerLike?: string;
      minPrice?: number;
      maxPrice?: number;
      search?: string;
      sorting?: string;
    }
  ){
    let queryParams = new HttpParams();

    if (start) queryParams = queryParams.append('_start', start);
    if (limit) queryParams = queryParams.append('_limit', limit);
    if (metaId) queryParams = queryParams.append('product.id', metaId);
    if (productId) queryParams = queryParams.append('id', productId);
    if (titleLike) queryParams = queryParams.append("product.title_like", titleLike);
    if (category) queryParams = queryParams.append("product.category.name", category);
    if (categoryLike) queryParams = queryParams.append("product.category.name_like", categoryLike);
    if (brandLike) queryParams = queryParams.append("product.brand.name_like", brandLike);
    if (sellerLike) queryParams = queryParams.append("seller.name_like", sellerLike);
    if (minPrice) queryParams = queryParams.append("price_gte", minPrice);
    if (maxPrice) queryParams = queryParams.append("price_lte", maxPrice);
    if (search) queryParams = queryParams.append("q", search);
    if (sorting === 'PRICE: LOW TO HIGH') {
      queryParams = queryParams.append('_sort','price');
      queryParams = queryParams.append('_order','asc');
    }
    if (sorting === 'PRICE: HIGH TO LOW') {
      queryParams = queryParams.append('_sort','price');
      queryParams = queryParams.append('_order','desc');
    }
    if (sorting === 'BEST RATED') {
      queryParams = queryParams.append('_sort','rating');
      queryParams = queryParams.append('_order','desc');
    }
    if (sorting === 'RECOMMENDED') {
      queryParams = queryParams.append('_sort','seller.sales');
      queryParams = queryParams.append('_order','desc');
    }

    return this.products.get(environment.AUTH_API + 'products/', {params: queryParams, observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => {
        const totalCountHeader = response.headers.get('X-Total-Count');
        let responseBody = response.body;
        responseBody.totalCountHeader = totalCountHeader
        return responseBody;
      })
    );
  }
}
