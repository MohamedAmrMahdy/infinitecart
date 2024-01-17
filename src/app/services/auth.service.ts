import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.AUTH_API + 'login', {
      email,
      password,
    }, httpOptions);
  }

  register(name:string, email: string, password: string): Observable<any> {
    let firstName = name.split(' ').slice(0, 1).join(' ');
    let lastName = name.split(' ').slice(1).join(' ');
    return this.http.post(environment.AUTH_API + 'register', {
      image: "",
      firstName,
      lastName,
      gender: "male",
      birthDate: "",
      phone: "",
      email,
      password,
      address: {
        address: "",
        country: "",
        city: "",
        state: "",
        postalCode: ""
      },
    }, httpOptions);
  }

}
