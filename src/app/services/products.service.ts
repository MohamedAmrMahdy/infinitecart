import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ProductsService{

  constructor(private products:HttpClient) { }
  private DB_URL = 'http://localhost:3000/products';

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
      search
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

    return this.products.get(this.DB_URL, {params: queryParams});
  }
}
