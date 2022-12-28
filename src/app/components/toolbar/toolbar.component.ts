import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router:Router, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '')
  }

  user : any = {}
  toggle : any = false

  onLogout()
  {
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }

  onToggle()
  {
    this.toggle = !this.toggle
    this.sharedService.setToggleClicked(this.toggle);
  }

}
