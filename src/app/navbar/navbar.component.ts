import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  islogin: Observable<boolean>;
  // token;
  constructor(public Api: ApiService, private router: Router) {
    this.islogin = Api.isloginin();
  }

  ngOnInit() {
    // this.token = this.Api.getToken();
  }
  logout() {
    this.Api.logout();
    // this.router.navigateByUrl('/login');
  }

}
