import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  constructor(private router:Router){}
  isLoading: boolean = true;

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }
  
  activeForm: string = 'login';
  click(){
    this.router.navigate(['login2']);
  }
  switchForm(form: string): void {
    this.activeForm = form;
  }
}

