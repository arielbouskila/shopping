import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = {};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data: any) => {
      this.user = data.user;
    })
  }
  logout() {
    this.userService.logout().subscribe((logedout) => {
      this.user = null;
      this.router.navigate(['/login']);
    })
  }

}
