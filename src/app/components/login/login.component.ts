import { Component, OnInit, HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;
  public username : any = '';
  public password : any = '';
  public createdUser :any = false
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
      console.log(this.getScreenWidth, this.getScreenHeight)
      this.createdUser = localStorage.getItem('createduser')
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  onLogin()
  {
    let credentails = {
      reqdata : {
        username :  this.username,
        password : this.password
      },
      collectionName : 'members'
      
    }
    this.loginService.login(credentails).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Credentials! try again.'
        })
        return
      }
      delete res.user.password
      sessionStorage.setItem('user', JSON.stringify(res.user))
      localStorage.setItem('createduser', 'true');
      this.router.navigate(['/dashboard/members'])
    }, (err:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Credentials! try again.'
      })
      return
    })
    
  }

}
