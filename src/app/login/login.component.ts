import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, public authService: AuthService) {}

  login() {
    const user = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(user).subscribe(
      (response: any) => {
        console.log('Login response:', response);

        if (response.token) {
          localStorage.setItem("user",JSON.stringify(response.user_data))
          // Save the token and user details in a secure way, such as local storage or a cookie
          // this.authService.saveToken(response.token);
          // this.authService.saveUser(response.user);
          Swal.fire('Login successful', '', 'success');
          this.router.navigate(['/home']);
        } else {
          Swal.fire('User is not verified. Please check your email for verification.', '', 'error');
        }
      },
      (error: any) => {
        // Handle login error
        Swal.fire('Login failed. Please check your credentials.', '', 'error');
      }
    );
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  register() {
    this.router.navigate(['/register'])
  }

  activeForm: string = 'login';
}


  // constructor(private http: HttpClient, private router:Router){}
  // email: string ='';
  // password: string='';

  // register(){
  //   let bodyData =
  //   {
  //     "email": this.email,
  //     "password": this.password,
  //   };
//   let headers = new HttpHeaders({
//     'Content-Type': 'application/json'});
// let options = { headers: headers };
  
  //   this.http.post("http://localhost:5000/login",bodyData).subscribe((resultData: any)=>
  //   {
  //       console.log(resultData);
       
  //       if(resultData.status){
  //         this.router.navigateByUrl('/home')
  //       }
  //       else {
  //         alert("Incorrect E-mail or Password");
  //         console.log("Error Login");
  //       }
  //   })
  // }
  

  // login() {
  //   this.register(); 
  // }
  
  // click(){
  //   this.router.navigate(['login2']);
  // }
  // switchForm(form: string): void {
  //   this.activeForm = form;
  // }


