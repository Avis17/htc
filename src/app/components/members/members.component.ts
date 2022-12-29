import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private userService:UserService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.adminAccess = this.sharedService.isAdminCheck();
    this.getUsers();
  }

  toggle:boolean = true
  users:any = []
  searchText :any = ''
  p: number = 1;
  adminAccess:any;
  getUsers()
  {
    this.userService.getUsers('members',{}).subscribe((res:any)=>{
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

  onClickSort(sortType:any){
    this.toggle = !this.toggle
    if(this.toggle)
    {
      this.users.sort((x:any, y:any) => {
        if (x[sortType] < y[sortType]) {
          return -1;
        }
        if (x[sortType] > y[sortType]) {
          return 1;
        }
        return 0;
      })
    }else{
      this.users.sort((x:any, y:any) => {
        if (x[sortType] < y[sortType]) {
          return 1;
        }
        if (x[sortType] > y[sortType]) {
          return -1;
        }
        return 0;
      })
    }
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
        this.userService.deleteUser('members', user).subscribe((res:any)=>{
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
    this.userService.updateUser('members', user).subscribe((res:any)=>{
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
