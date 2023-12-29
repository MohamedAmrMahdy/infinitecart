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
      console.log('Simulated Request to', this.apiUrl);
      sessionStorage.setItem('email', email);
      observer.next({email, password});
      observer.complete();
    });
  }
}
