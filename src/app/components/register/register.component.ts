import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
  }

  userDetails = {
    flatNo : '',
    name: '',
    username : '',
    email : '',
    phone : '',
    alternatePhone : '',
    typeOfFlat : '',
    typeOfUse : '',
    gender : '',
    bloodGroup : '-- Blood Group --',
    password : ''
  }

  onValidate()
  {
    if(this.userDetails.flatNo != '' && this.userDetails.name != '' && this.userDetails.email != '' && this.userDetails.phone != '' &&
    this.userDetails.alternatePhone != '' && this.userDetails.password != '' && this.userDetails.typeOfFlat != ''
    && this.userDetails.typeOfUse != '' && this.userDetails.gender != '' && this.userDetails.bloodGroup != ''){
      return false
    }
    return true
  }

  onRegister()
  {
    this.loginService.register(this.userDetails).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registration failed! try again.'
        })
        return
      }
      Swal.fire({
        icon: 'success',
        text: 'User Registered successfully.'
      })
      this.router.navigate([''])
    })
  }

}
