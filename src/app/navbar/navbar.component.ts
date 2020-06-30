import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token;
  constructor(public Api: ApiService, private router: Router) { }

  ngOnInit() {
    this.token = this.Api.getToken();
  }
  logout() {
    this.Api.logout();
    // this.router.navigateByUrl('/login');
  }

}
