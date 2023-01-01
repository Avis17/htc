import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private shraedService:SharedService) { }

  isToggle = false;
  ngOnInit(): void {
    this.shraedService.getToggleClicked().subscribe((res:any)=>{
      this.isToggle = res;
    });
    this.userDetails = JSON.parse(sessionStorage.getItem('user') || '');
    this.username = this.userDetails.email.split("@")[0]
  }

  userDetails : any;
  username : any = ''
}
