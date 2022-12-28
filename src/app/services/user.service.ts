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

  updateUser(userDetails:any){
    let _id = userDetails._id;
    delete userDetails._id;
    return this.http.post(this.url+'update-user', {collectionName :'members', data : userDetails, query : _id});
  }

  deleteUser(user:any){
    let _id = user._id;
    return this.http.post(this.url+'delete-user', {collectionName :'members', query : _id});
  }

}



