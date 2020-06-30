import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  BaseUrl = environment.baseuri;
  socket;
  constructor(private http: HttpClient) {
    this.socket = io();
  }
  sendComment(data, id) {
    const url = `${this.BaseUrl}/socket/comment/${id}`;
    return this.http.put(url, data);
  }

  getComment(id) {
    const url = `${this.BaseUrl}/socket/getcomment/${id}`;
    return this.http.get(url);
  }

}
