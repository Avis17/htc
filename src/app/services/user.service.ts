import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  // url = 'http://localhost:3000/api/web/'
  url = 'https://hi-techcity.onrender.com/api/web/'


  getUsers(collectionName:any,query:any){
    return this.http.post(this.url+'getusers', {collectionName :collectionName, query : query});
  }

  updateUser(collectionName:any, userDetails:any){
    let _id = userDetails._id;
    delete userDetails._id;
    return this.http.post(this.url+'update-user', {collectionName :collectionName, data : userDetails, query : _id});
  }

  deleteUser(collectionName : any, user:any){
    let _id = user._id;
    return this.http.post(this.url+'delete-user', {collectionName :collectionName, query : _id});
  }

  addData(collectionName:any,data:any)
  {
    return this.http.post(this.url+'register', {
      collectionName : collectionName,
      reqdata : {
        ...data
      }
    })
  }
}



