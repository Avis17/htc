import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-minutes-of-meeting',
  templateUrl: './minutes-of-meeting.component.html',
  styleUrls: ['./minutes-of-meeting.component.scss'],
})
export class MinutesOfMeetingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private renderer: Renderer2,
    private userService:UserService,
    private _location: Location
  ) {
    this.date = new Date();
  }

  ngOnInit(): void {
    this.getData('members');
    this.date = this.route.snapshot.paramMap.get('date') ?? '';
    if(this.date)
    {
      this.getMeetingHistory(this.date)
    }
    this.adminAccess = this.sharedService.isAdminCheck();
  }

  date: any;
  adminAccess: any = '';
  modalType: String = '';
  actionsList: any = [];
  notesList: any = [];
  decisionsList: any = [];
  attendeesList: any = [];
  agendaList: any = [];
  goalsList: any = [];
  myInputValue : string = ''
  meetingHistory : any = {}
  users :any = []

  getMeetingHistory(date:Date)
  {
    this.userService.getUsers('meetings',{"date" : date}).subscribe((res:any)=>{
      console.log(res)
      if(res.status == 200)
      {
        this.meetingHistory = res.data[0];
        console.log(this.meetingHistory)
        if(this.meetingHistory)
        {
          this.actionsList = this.meetingHistory.Action ?? [];
          this.notesList = this.meetingHistory.Notes ?? [];
          this.decisionsList = this.meetingHistory.Decisions ?? [];
          this.attendeesList = this.meetingHistory.Attendees ?? [];
          this.agendaList = this.meetingHistory.Agenda ?? [];
          this.goalsList = this.meetingHistory.Goals ?? [];
        }
      }
    })
  }
  
  onClickPrevious()
  {
    this._location.back();
  }

  onChangeType(type: String) {
    this.modalType = type;
  }

  getData(collectionName:String)
  {
    this.userService.getUsers(collectionName,{}).subscribe((res:any)=>{
      if(res.status != 200)
      {
        return
      }
      this.users = res.data;
    })
  }

  onClickItem(value: string) {
    this.myInputValue = value
    switch (this.modalType) {
      case 'Action':
        this.actionsList.push(value);
        this.updateAndClearValue("Action", this.actionsList)
        break;
      case 'Notes':
        this.notesList.push(value);
        this.updateAndClearValue("Notes", this.notesList)
        break;
      case 'Decisions':
        this.decisionsList.push(value);
        this.updateAndClearValue("Decisions", this.decisionsList)
        break;
      case 'Attendees':
        this.attendeesList.push(value);
        this.updateAndClearValue("Attendees", this.attendeesList)
        break;
      case 'Agenda':
        this.agendaList.push(value);
        this.updateAndClearValue("Agenda", this.agendaList)
        break;
      case 'Goals':
        this.goalsList.push(value);
        this.updateAndClearValue("Goals", this.goalsList)
        break;
      default:
        break;
    }
  }

  updateAndClearValue(key:string, value:any)
  {
    this.userService.updateUser('meetings', {
      ...this.meetingHistory,
      [key] : value
    }).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'meeting details added failed! try again.'
        })
          return
      }
      Swal.fire({
        icon: 'success',
        text: 'meeting details added successfully.'
      })
      this.myInputValue = ''
    })
  }
}
