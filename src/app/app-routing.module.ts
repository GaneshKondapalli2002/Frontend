import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'register',
    component: Login2Component
  },
  {
    path:'home',
    component: DashboardComponent
  },
  {
    path:'updateProfile',
    component:UserprofileComponent
  },
  { path: 'otp-verification', component: OtpVerificationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
