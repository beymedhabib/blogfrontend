import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: FormData;
  j ;
  constructor(private Api: ApiService, private router: Router) {
    this.data = new FormData();

  }
table;
updateForm: FormGroup;
file: File;
  ngOnInit() {
    this.updateForm = new FormGroup({
      // image : File,
      title: new FormControl(),
      subject: new FormControl()
    });
    this.get();
    // console.log(this.Api.decoded);
  }
  get() {
    this.Api.getarticle().subscribe(res => {
console.log(res);
this.table = res;
    });
  }
  Delete(i) {
    this.Api.deletearticle(this.table[i]._id).subscribe(res => {
      console.log(res);
    });
    this.table.splice(i, 1);
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
  }
}
up(i) {
  this.j = this.table[i]._id;
  this.updateForm = new FormGroup({
    title: new FormControl(this.table[i].title),
    subject: new FormControl(this.table[i].subject)
  });
}
update() {
  this.Api.updatearticle(this.j, this.updateForm.value).subscribe((res: any) => {
    console.log(res);
    this.upload(res._id);
  });
}
upload(id) {
  this.data.set('file', this.file);
  console.log(this.data.get('file'));
  this.Api.upload(this.data, id).subscribe(res => {
      console.log(res);
    });
}

}
