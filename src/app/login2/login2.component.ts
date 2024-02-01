import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component {

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private service: ServiceService) { }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (!hasUppercase || !hasSpecialCharacter) {
      return { 'passwordRequirements': true };
    }

    return null;
  }

  signinForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegex), Validators.minLength(5), Validators.maxLength(32)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), this.passwordValidator]],
  });

  generateVerificationLink(token: string): string {
    return `http://localhost:5000/verify/${token}`;
  }

  async register() {
    const bodyData = {
      "firstname": this.signinForm.value.firstname,
      "lastname": this.signinForm.value.lastname,
      "email": this.signinForm.value.email,
      "password": this.signinForm.value.password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    try {
      const resultData: any = await this.service.registerUser(bodyData).toPromise();

      if (resultData.status === 'Success') {
        // Registration was successful
        const verificationLink = this.generateVerificationLink(resultData.verificationToken);
        await this.sendVerificationEmail(this.signinForm.get('email')!.value, verificationLink);
        Swal.fire('Registration Successful', 'Verification email sent. Check your email for instructions.', 'success');

      } else if (resultData.status === 'Failed' && resultData.message === 'Email is already registered') {
        // Email already exists
        Swal.fire('Registration Failed', 'Email is already registered. Please use another email.', 'error');
      } else {
        Swal.fire('Registration Failed', 'Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire('Error during registration. Please try again.', 'error');
    }
  }

  async sendVerificationEmail(email: any, verificationLink: string) {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    try {
      await this.http.get(`http://localhost:5000/verify?token=${verificationLink}`, options).toPromise();
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }


  
  async save() {
    console.log('Form validity:', this.signinForm.valid);

    if (this.signinForm.valid) {
      try {
        await this.register();
        this.signinForm.reset();
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  }
}