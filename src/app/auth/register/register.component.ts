import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
  constructor(private Api : ApiService, private router: Router) { }

  ngOnInit() {
    this.registerform = new FormGroup({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)])
    })
  }
  reg() {
this.Api.register(this.registerform.value).subscribe(res=>{
  console.log(res);
})
this.router.navigateByUrl('/login');

  }

}
