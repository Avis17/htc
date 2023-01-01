import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  constructor(private userService:UserService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('user') || '');
    this.getTenants();
    this.adminAccess = this.sharedService.isAdminCheck();
  }
  userDetails : any = {}
  searchText :any = ''
  tenantsList :any = []
  isShow :any =  false;
  p: number = 1;
  toggle:any = true
  adminAccess:any;
  newTenant:any = {
    tenantType: "",
    tenantName : '',
    tenantEmail : '',
    tenantPhone : '',
    tenantAadharNo : '',
    noOfTenantsInTheFlat : '',
    accupiedDate : '' 
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
        this.userService.deleteUser('tenants',user).subscribe((res:any)=>{
          if(res.status != 200)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'tenant deletion failed! try again.'
            })
            return
          }
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getTenants()
        })
        
      }
    })
  }

  onSave(user:any){
    user.isEdit = !user.isEdit
    this.userService.updateUser('tenants', user).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tenants update failed! try again.'
        })
          return
      }
      Swal.fire({
        icon: 'success',
        text: 'Tenants updated successfully.'
      })
    })
  }
  
  getTenants()
  {
    this.userService.getUsers('tenants',{}).subscribe((res:any)=>{
      if(res.status != 200)
      {
        return
      }
      console.log(res.data)
      this.tenantsList = res.data;
      let user = this.tenantsList.find((data:any)=>{
        return data.email == this.userDetails.email
      })
      if(user)
      {
        this.isShow = false;
      }else{
        if(this.userDetails.typeOfUse == 'rental'){
          this.isShow = true
        }
      }
    })
  }

  onClickTenant()
  {
    this.userService.addData("tenants",{
      ...this.newTenant,
      name : this.userDetails.name,
      createdAt : new Date(),
      phone : this.userDetails.phone,
      email : this.userDetails.email,
      flatNo : this.userDetails.flatNo,
      rentalType : this.userDetails.rentalType
    }).subscribe((res:any)=>{
      if(res.status != 200)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tenants added failed! try again.'
        })
        return
      }
      Swal.fire({
        icon: 'success',
        text: 'Tenants added successfully.'
      });
      this.newTenant = {
        tenantType: "",
        tenantName : '',
        tenantEmail : '',
        tenantPhone : '',
        tenantAadharNo : '',
        noOfTenantsInTheFlat : '',
        accupiedDate : '' 
      }
      this.getTenants();
    })
  }

  validateTenant()
  {
    if(this.newTenant.tenantName != '' && this.newTenant.tenantEmail != '' && this.newTenant.tenantPhone != ''
    && this.newTenant.tenantAadharNo != '' && this.newTenant.noOfTenantsInTheFlat != '' && this.newTenant.accupiedDate != ''){
      return false
    }
    return true
  }

  onClickSort(sortType:any){
    this.toggle = !this.toggle
    if(this.toggle)
    {
      this.tenantsList.sort((x:any, y:any) => {
        if (x[sortType] < y[sortType]) {
          return -1;
        }
        if (x[sortType] > y[sortType]) {
          return 1;
        }
        return 0;
      })
    }else{
      this.tenantsList.sort((x:any, y:any) => {
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
