import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meeting-notes',
  templateUrl: './meeting-notes.component.html',
  styleUrls: ['./meeting-notes.component.scss']
})
export class MeetingNotesComponent implements OnInit {

  constructor(private router:Router,private sharedService:SharedService, private userService : UserService) { }

  ngOnInit(): void {
    this.adminAccess = this.sharedService.isAdminCheck();
    this.getData('members');
    this.getData('meetings');
  }

  adminAccess:any = ''
  newMeeting : any = {
    date : "",
    organisedBy : 'Select an Organiser'
  }
  searchText :any = ''
  meetingList :any = []
  users :any = []
  isShow :any =  false;
  p: number = 1;
  toggle:any = true

  onClickMeeting()
  {
    this.userService.addData('meetings',{
      ...this.newMeeting,
    }).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Meeting added failed! try again.'
        })
        return
      }
      Swal.fire({
        icon: 'success',
        text: 'Meeeting added successfully.'
      });
      this.newMeeting = {
        date : "",
        organisedBy : 'Select an Organiser'
      }
      this.getData('meetings');
    })
  }

  navigateComponent(date:Date)
  {
    this.router.navigate(['/dashboard/minutes-of-meeting', date])
  }


  onDelete(meeting:any){
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
        this.userService.deleteUser('meetings',meeting).subscribe((res:any)=>{
          if(res.status != 200)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Meeting deletion failed! try again.'
            })
            return
          }
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getData('meetings')
        })
        
      }
    })
  }


  getData(collectionName:String)
  {
    this.userService.getUsers(collectionName,{}).subscribe((res:any)=>{
      if(res.status != 200)
      {
        return
      }
      if(collectionName == "meetings")
      {
        this.meetingList = res.data
        return
      }
      this.users = res.data;
    })
  }

  onPageChange(event: any) {
    this.p = event;
  }

  validateMeeting()
  {
    if(this.newMeeting.date != '' && this.newMeeting.organisedBy != 'Select an Organiser'){
      return false
    }
    return true
  }
  

}
