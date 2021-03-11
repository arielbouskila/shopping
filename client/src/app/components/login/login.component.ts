import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    this.http.post('http://localhost:3000/users/login', { "username": this.email, "password": this.password }).subscribe(
      (res: any) => {
        console.log(res);
        //localStorage.setItem("token", res.token)
        this.router.navigate(['/shop'])
      },
      (err) => console.log(err)
    );
  }

}
