import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MeetingNotesComponent } from './components/meeting-notes/meeting-notes.component';
import { MembersComponent } from './components/members/members.component';
import { MinutesOfMeetingComponent } from './components/minutes-of-meeting/minutes-of-meeting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/login',
    pathMatch :'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'change-password',
    component : ChangePasswordComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path : 'members',
        component : MembersComponent
      },
      {
        path : 'profile/:email',
        component : ProfileComponent
      },
      {
        path : 'complaints',
        component : ComplaintsComponent
      },
      {
        path : 'tenants',
        component : TenantsComponent
      },
      {
        path : 'meeting-notes',
        component : MeetingNotesComponent
      },
      {
        path : 'minutes-of-meeting/:date',
        component : MinutesOfMeetingComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
