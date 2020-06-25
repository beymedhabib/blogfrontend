import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  token;
  constructor(private Api: ApiService, private router:Router) {
    if ( localStorage.getItem('token')) {
      this.token =  localStorage.getItem('token');
    }
   }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  log() {
this.Api.login(this.LoginForm.value).subscribe(res=>{
  console.log(res);
  this.token = res ;
      localStorage.setItem('token', this.token.access_token);
});
this.router.navigateByUrl('/home');
  }
}
