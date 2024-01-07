import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  updateUserData(id:number, userData:any): Observable<any> {
    console.log('inside updateUserData()')
    console.log(userData)
    return this.http.patch(API + 'users' + '/' + id, {
      email:userData.email ,
      password: userData.password,
      image: "",
      firstName: userData.fName,
      lastName:userData.lName ,
      birthDate: userData.birthDate,
      phone: userData.phone,
      address: {
        address: userData.address,
        country: userData.country,
        city: userData.city,
        state: userData.state,
        postalCode: userData.zipCode
      },
    }, httpOptions);
  }



// updateUserData(userData:any): Observable<any> {
//     return this.http.post(API + 'users', {
//       firstName: userData.fName      
//     }, httpOptions);
//   }

}
