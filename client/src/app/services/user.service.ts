import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Address } from "../interface/address";
import { Router } from '@angular/router';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = { IdNumber: "", Email: "", password: "", firstName: "", lastName: "", role: 0, address: '', city: '' }
  private address: Address = { city: "", street: "" }
  public isValid = false
  constructor(public http: HttpClient,
    private router: Router) { }


  addStepOne(IdNumber: string, Email: string, password: string) {
    this.user.IdNumber = IdNumber
    this.user.Email = Email
    this.user.password = password

    this.http.post('http://localhost:3000/users/valid', this.user).subscribe(
      (res: any) => {
        const isValid = res.userExists
        console.log(isValid);
        this.isValid = isValid
        if (isValid) {
          this.router.navigate(['/steptwo'])
        }
      },
      (err) => console.log(err)
    );
  }

  addStepTwo(firstName: string, lastName: string, city: string, street: string) {
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.address = street;
    this.user.city = city;
    this.register()

  }

  getCurrentUser() {
    return this.http.get('http://localhost:3000/users/currentUser')
  }
  logout() {
    return this.http.get('http://localhost:3000/users/logout');
  }


  register() {

    this.http.post('http://localhost:3000/users/register', this.user).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['/login'])
      },
      (err) => console.log(err)
    );
  }
}
