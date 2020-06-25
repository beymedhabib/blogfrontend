import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  data: FormData;
  decoded = jwt_decode(this.Api.token);
  constructor(private Api: ApiService, private router: Router) {
    this.data = new FormData();
  }
  articleForm: FormGroup;
  file: File;
  ngOnInit() {
    this.articleForm = new FormGroup({
      // image : File,
      title: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required])
    });
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
  }
}
  post() {
    this.Api.post(this.articleForm.value).subscribe((res: any) => {
    this.upload(res._id);
    this.affectarticle(res._id);
    });
    this.router.navigateByUrl('/home');
  }
  affectarticle(articleid) {
this.Api.Affectarticle(this.decoded.data._id, articleid).subscribe(res => {
  console.log(res);
});
  }
  upload(id) {
    this.data.set('file', this.file);
    this.Api.upload(this.data, id).subscribe(res => {
        console.log(res);
      });
    this.router.navigateByUrl('/home');
  }
}
