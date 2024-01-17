import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  constructor(private sellers:HttpClient) { }

  getSellers() {
    return this.sellers.get(environment.AUTH_API + 'sellers/')
  }
}
