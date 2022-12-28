import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  users:any = []
  searchText :any = ''
  getUsers()
  {
    this.userService.getUsers().subscribe((res:any)=>{
      if(res.status != 200)
      {
        return
      }
      console.log(res.data)
      this.users = res.data
    })
  }

}
