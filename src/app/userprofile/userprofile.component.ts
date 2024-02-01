import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {
  profileData: any;
  selectedFile: File | null = null;

  constructor(private router: Router, private service: ServiceService) {}

  ngOnInit(): void {
    let data: any = localStorage.getItem('user');
    this.profileData = JSON.parse(data);
    
  }

  // getUserProfile() {
  //   this.service.getUserProfile().subscribe(
  //     (data) => {
  //       this.profileData = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching user profile:', error);
  //     }
  //   );
  // }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileData.photoUrl = e.target.result;
        this.uploadPhoto(file); // Trigger the file upload here
      };
      reader.readAsDataURL(file);
    }
  }
  


  uploadPhoto(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
  
    this.service.uploadPhoto(formData).subscribe(
      (response) => {
        // Handle successful response
      },
      (error) => {
        console.error('Error uploading profile picture:', error);
        // Handle error, display a user-friendly message, etc.
      }
    );
  }
  
  updateUserProfile() {
    const user = {
        firstname: this.profileData.firstname,
        lastname: this.profileData.lastname,
        email: this.profileData.email
    };

    const formData = new FormData();
    
    if (this.selectedFile) {
        formData.append('file', this.selectedFile);
    }

    formData.append('user', JSON.stringify(user));

    this.service.updateUserProfile(this.profileData._id, formData).subscribe(
        (response) => {
            console.log('Profile updated successfully:', response);
            this.profileData.photoUrl = response.user.photoUrl;
            // Optionally, update other properties if needed
        },
        (error) => {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    );
}



}


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ServiceService } from '../service.service';

// @Component({
//   selector: 'app-userprofile',
//   templateUrl: './userprofile.component.html',
//   styleUrls: ['./userprofile.component.scss'],
// })
// export class UserprofileComponent implements OnInit {
//   profileData: any;
//   selectedFile: File | null = null;

//   constructor(private router: Router, private service: ServiceService) {}

//   ngOnInit(): void {
//     let data: any = localStorage.getItem('user');
//     this.profileData = JSON.parse(data);
//     this.getUserProfile();
//   }

//   getUserProfile() {
//     this.service.getUserProfile().subscribe(
//       (data) => {
//         this.profileData = data;
//       },
//       (error) => {
//         console.error('Error fetching user profile:', error);
//       }
//     );
//   }

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];

//     if (file) {
//       this.selectedFile = file;
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.profileData.photoUrl = e.target.result;
//       };
//       reader.readAsDataURL(file);

//       // Automatically upload the photo here
//       this.uploadPhoto();
//     }
//   }

//   uploadPhoto() {
//     if (this.selectedFile) {
//       const formData = new FormData();
//       formData.append('file', this.selectedFile);

//       // Step 1: Upload photo
//       this.service.uploadPhoto(formData).subscribe(
//         (photoResponse) => {
//           console.log('Photo uploaded successfully:', photoResponse);

//           // Update user's photo URL in your local storage or wherever needed
//           this.profileData.photoUrl = photoResponse.photoUrl;

//           // Step 2: After uploading photo, update the user profile
//           this.updateUserProfile();
//         },
//         (photoError) => {
//           console.error('Error uploading photo:', photoError);
//         }
//       );
//     }
//     // No else condition here as the photo will be automatically uploaded on file selection
//   }

//   updateUserProfile() {
//     const formData = new FormData();
//     formData.append('firstname', this.profileData.firstname);
//     formData.append('lastname', this.profileData.lastname);

//     // Check if a file is selected before appending to FormData
//     if (this.selectedFile) {
//       formData.append('file', this.selectedFile);
//     }

//     // Step 3: Update user profile
//     this.service.updateUserProfile(formData).subscribe(
//       (response) => {
//         console.log('Profile updated successfully:', response);
//         // Handle the response as needed
//       },
//       (error) => {
//         console.error('Error updating profile:', error);
//         // Handle the error
//       }
//     );
//   }
// }


