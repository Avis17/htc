import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  constructor(private userService:UserService, private sharedService :SharedService) { }

  ngOnInit(): void {
    this.getComplaints();
    this.userDetails = JSON.parse(sessionStorage.getItem('user') || '');
    this.adminAccess = this.sharedService.isAdminCheck();
  }
  complaintsList:any = []
  userDetails:any = {}
  p: number = 1;
  toggle:any = true
  searchText : any = ''
  adminAccess:any;
  newComplaint:any = {
    title: "",
    complaint : ''
  }
  onClickComplaint(){
    this.userService.addData({
      ...this.newComplaint,
      raisedBy : this.userDetails.name,
      raisedDate : new Date(),
      contactNo : this.userDetails.phone,
      email : this.userDetails.email,
      flatNo : this.userDetails.flatNo,
      status : 'Pending',
      remarks : ''
    }).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Complaint Registration failed! try again.'
        })
        return
      }
      Swal.fire({
        icon: 'success',
        text: 'Complaint Registered successfully.'
      });
      this.newComplaint = {
        title: "",
        complaint : ''
      }
      this.getComplaints();
    })
  }
  getComplaints()
  {
    this.userService.getUsers('complaints',{}).subscribe((res:any)=>{
      if(res.status != 200)
      {
        return
      }
      console.log(res.data)
      res.data.sort((a:any, b:any) => {
        return a.raisedDate - b.raisedDate;
      })
      this.complaintsList = res.data;

    })
  }
  onPageChange(event: any) {
    this.p = event;
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
        this.userService.deleteUser('complaints',user).subscribe((res:any)=>{
          if(res.status != 200)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Complaints deletion failed! try again.'
            })
            return
          }
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getComplaints()
        })
        
      }
    })
  }

  onSave(user:any){
    user.isEdit = !user.isEdit
    this.userService.updateUser('complaints', user).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Complaints update failed! try again.'
        })
          return
      }
      Swal.fire({
        icon: 'success',
        text: 'Complaints updated successfully.'
      })
    })
  }
  onClickSort(sortType:any){
    this.toggle = !this.toggle
    if(this.toggle)
    {
      this.complaintsList.sort((x:any, y:any) => {
        if (x[sortType] < y[sortType]) {
          return -1;
        }
        if (x[sortType] > y[sortType]) {
          return 1;
        }
        return 0;
      })
    }else{
      this.complaintsList.sort((x:any, y:any) => {
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

}
