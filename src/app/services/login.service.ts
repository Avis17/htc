import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  // url = 'http://localhost:3000/api/web/'
  url = 'https://hi-techcity.onrender.com/api/web/'

  
  login(credentails:any)
  {
    return this.http.post(this.url+'login', credentails);
  }

  register(user:any)
  {
    return this.http.post(this.url+'register', {
      collectionName : 'members',
      reqdata : {
        ...user,
        createdAt : new Date(),
        username : user.email,
        password : user.password.trim()
      }
    });
  }

  gettoken(){  
    return sessionStorage.getItem("user") ? true : false  
  }  
}
