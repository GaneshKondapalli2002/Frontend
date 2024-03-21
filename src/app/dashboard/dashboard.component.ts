import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = {};
  editForm!: FormGroup;
  showForm: boolean = false;
  userProfile: any = {};


  constructor(private http: HttpClient, private fb: FormBuilder,private router:Router, private service:ServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.editForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  fetchUsers() {
    console.log('Fetching users...');
    this.authService.getData().subscribe(
      (data) => {
        console.log('Data received:', data);
        this.users = data;
        console.log('Users data fetched successfully:', this.users);
      },
      (err) => {
        console.error('Error fetching data:', err);
        if (err.status === 401) {
          console.log('Unauthorized access. Token may be invalid or expired.');
          this.authService.logout(); // Logout on unauthorized access
          this.router.navigate(['/login']); // Navigate to login page
        } else if (err.status === 403) {
          console.log('Forbidden. Token has expired.');
          this.authService.logout(); // Logout on token expiration
          this.router.navigate(['/login']); // Navigate to login page
        }
      }
    );
  }
  // fetchUsers() {
  //   console.log('Fetching users...');
  //   this.service.getData().subscribe(
  //     (data) => {
  //       console.log('Data received:', data);
  //       this.users = data;
  //       console.log('Users data fetched successfully:', this.users);
  //     },
  //     (err) => {
  //       console.error('Error fetching data:', err);
  //       // Handle error
  //     }
  //   );
  // }
  

  // fetchUsers() {
  //   console.log('Fetching users...');
  //   this.authService.getData().subscribe(
  //     (data) => {
  //       console.log('Data received:', data);
  //       this.users = data;
  //       console.log('Users data fetched successfully:', this.users);
  //     },
  //     (err) => {
  //       console.error('Error fetching data:', err);
  //       if (err.status === 401) {
  //         console.log('Unauthorized access. Token may be invalid or expired.');
  //         this.authService.logout(); // Logout on unauthorized access
  //         this.router.navigate(['/login']); 
  //         } else if (err.status === 403) {
  //         console.log('Forbidden. Token has expired.');
  //         this.authService.logout(); // Logout on token expiration
  //       }
  //     }
  //   );
  // }

  
  editUser(user: any) {
    this.selectedUser = user;
    this.editForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    });
    this.showForm = true;
  }

  onSubmit() {
    const editedUser = { ...this.selectedUser, ...this.editForm.value };
    this.service.editUser(this.selectedUser._id, editedUser).subscribe(response => {
      console.log('User edited successfully:', response);
      this.editForm.reset();
      this.selectedUser = {};
      this.showForm = false; 
      this.fetchUsers();
    });
  }

  // updateUser(updatedUser: any) {
  //   const headers = { 'Content-Type': 'application/json' };

  //   this.http.put(`http://localhost:5000/editUser/${updatedUser._id}`, updatedUser, { headers }).subscribe(response => {
  //     console.log('User updated successfully:', response);

  //     // Replace the existing user in the array with the updated user
  //     const index = this.users.findIndex(user => user._id === updatedUser._id);
  //     if (index !== -1) {
  //       this.users[index] = updatedUser;
  //     }

  //     // Clear selectedUser after updating
  //     this.selectedUser = null;
  //   });
  // }

  deleteUser(userId: string) {
    const userConfirmed = window.confirm('Are you sure you want to delete this user?');

  if(userConfirmed){  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.service.deleteUser(userId).subscribe(response => {
      console.log(response);
      this.fetchUsers();  
    },
  (error) => {
    console.error(error);
  } 
  );
}
  }
  update(){
    alert('User data updated succesfully');
    this.fetchUsers();
  }
}
     

