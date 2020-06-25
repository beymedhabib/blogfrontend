import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
BaseUrl = environment.baseuri;
  constructor(private http: HttpClient, private router: Router) { }
  token = localStorage.getItem('token');
  // decoded = jwt_decode(this.token);

  register(data) {
    const url = `${this.BaseUrl}/user/register`;
    return this.http.post(url, data);
  }
  login(data) {
    const url = `${this.BaseUrl}/user/login`;
    return this.http.post(url, data);
  }
  logout() {
    localStorage.removeItem('token');
  }
  post(data) {
    const url = `${this.BaseUrl}/article/add`;
    return this.http.post(url, data);
  }
  Affectarticle(id, articleid) {
    const url = `${this.BaseUrl}/article/affect/${id}/${articleid}`;
    return this.http.put(url, {});
  }
  upload(data, id) {
    const url = `${this.BaseUrl}/uploadimg/${id}`;
    return this.http.post(url, data);
  }
  getarticle() {
    const url = `${this.BaseUrl}/article/get`;
    return this.http.get(url);
  }
  deletearticle(id) {
const url = `${this.BaseUrl}/article/delete/${id}`;
return this.http.delete(url);
  }
  updatearticle(id, data) {
const url = `${this.BaseUrl}/article/update/${id}`;
return this.http.put(url, data);
  }
}
