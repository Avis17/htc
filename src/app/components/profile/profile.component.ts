import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('user') || '');
  }

  userDetails : any = {}
  isEdit = false;

  onEdit()
  {
    this.isEdit = true;
  }

  onSave()
  {
    this.isEdit = false;
    this.userService.updateUser(this.userDetails).subscribe((res:any)=>{
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

}
