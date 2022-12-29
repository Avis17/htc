import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.email = params['email'];
      if(this.email)
      {
        this.getUserDetails(this.email)
      }
    });
    // this.userDetails = JSON.parse(sessionStorage.getItem('user') || '');
  }

  userDetails : any = {}
  isEdit = false;
  email:any;
  onEdit()
  {
    this.isEdit = true;
  }

  onSave()
  {
    this.isEdit = false;
    this.userService.updateUser('members', this.userDetails).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User details update failed! try again.'
        })
          return
      }
      Swal.fire({
        icon: 'success',
        text: 'User details updated successfully.'
      })
    })
  }

  getUserDetails(email:any)
  {
    this.userService.getUsers('members',{"email" : email}).subscribe((res:any)=>{
      console.log(res)
      if(res.status == 200)
      {
        this.userDetails = res.data[0];
      }
    })
  }

}
