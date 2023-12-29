import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUser } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3030';

  constructor() { }

  login(email: string, password: string): Observable<IAuthUser> {
    return new Observable((observer) => {
      console.log('Simulated Request to', this.apiUrl + "/login");
      localStorage.setItem('email', email);
      observer.next({email, password});
      observer.complete();
    });
  }

  register(name:string, email: string, password: string): Observable<IAuthUser> {
    return new Observable((observer) => {
      console.log('Simulated Request to', this.apiUrl + "/register");
      localStorage.setItem('email', email);
      observer.next({name, email, password});
      observer.complete();
    });
  }
}