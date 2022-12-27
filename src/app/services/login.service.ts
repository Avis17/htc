import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:3000/api/web/'

  login(credentails:any)
  {
    return this.http.post(this.url+'login', credentails);
  }

  register(user:any)
  {
    return this.http.post(this.url+'register', user);
  }
}
