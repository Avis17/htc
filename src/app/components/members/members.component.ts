import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') || '');
    if(user)
    {
      this.adminAccess = user.isAdmin ? true : false
    }
    this.getUsers();
  }

  users:any = []
  searchText :any = ''
  p: number = 1;
  adminAccess = false;
  getUsers()
  {
    this.userService.getUsers().subscribe((res:any)=>{
      if(res.status != 200)
      {
        return
      }
      console.log(res.data)
      res.data.sort((a:any, b:any) => {
        return a.flatNo - b.flatNo;
      })
      this.users = res.data;
    })
  }

  onPageChange(event: any) {
    this.p = event;
  }

  onEdit(user:any){
    user.isEdit = !user.isEdit
  }
  onDelete(user:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((res:any)=>{
          if(res.status != 200)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'User details deletion failed! try again.'
            })
            return
          }
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getUsers()
        })
        
      }
    })
  }
  onCancel(user:any){
    user.isEdit = !user.isEdit
  }
  onSave(user:any){
    user.isEdit = !user.isEdit
    this.userService.updateUser(user).subscribe((res:any)=>{
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
