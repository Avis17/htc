import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  // url = 'http://localhost:3000/api/web/'
  url = 'https://hi-techcity.onrender.com/api/web/'


  getUsers(){
    return this.http.post(this.url+'getusers', {collectionName :'members', reqdata : {}});
  }

}



