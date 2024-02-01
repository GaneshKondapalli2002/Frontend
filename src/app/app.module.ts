import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes, Router } from '@angular/router';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Login2Component } from './login2/login2.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceService } from './service.service';
import { UserprofileComponent } from './userprofile/userprofile.component';

const root:Routes =[
  {
    path:'', component:LoginComponent
},
{
  path:'login2', component:Login2Component
}

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Login2Component,
    DashboardComponent,
    NavbarComponent,
    UserprofileComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(root),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
