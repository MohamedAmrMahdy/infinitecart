import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  constructor(private sellers:HttpClient) { }
  private DB_URL = 'http://localhost:3000/sellers';

  getSellers() {
    return this.sellers.get(this.DB_URL)
  }
}
