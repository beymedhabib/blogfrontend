import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import * as io from 'socket.io-client';
import { SocketService } from '../socket.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  // Socket;
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: max-line-length
  constructor(private Api: ApiService, private _Activatedroute: ActivatedRoute, private socketcomment: SocketService, private socket: Socket ) {
    // this.socket = io.connect('http://localhost:3000');
  }
  id = this._Activatedroute.snapshot.paramMap.get('idarticle');
  decoded = jwt_decode(this.Api.token);
  table;
  commente: FormGroup;
  // message: string;
commentaire = [];
  ngOnInit() {
    this.getArticleById();
    this.getComment();
    this.commente = new FormGroup ({
      comment: new FormControl(''),
      user : new FormControl(this.decoded.data.username)
    });

    this.socket.on('newComment', (data) => {
      this.getComment();
      console.log('hahahaha');
   });
  }
  getArticleById() {
    this.Api.getone(this.id).subscribe(res => {
      console.log(res);
      this.table = res;
    });
  }

sendMessage() {
  this.socketcomment.sendComment(this.commente.value, this.id).subscribe(res => {
    console.log(res);
  });
  this.commente = new FormGroup ({
    comment: new FormControl('')
      });
  }
  getComment() {
    this.socketcomment.getComment(this.id).subscribe((res: any) => {
      console.log(res);
      this.commentaire = res.comment;
    });
  }


}
