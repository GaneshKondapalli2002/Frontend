import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  profileData: any;
  selectedFile: File | null = null;
  imgUrl: string | undefined;
  showCardDetailsForm: boolean = false;
  cardNumber: string | undefined;
  cardHolderName: string | undefined;
  expirationDate: string | undefined;
  cvv: string | undefined;


  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const data: any = localStorage.getItem('user');
    this.profileData = JSON.parse(data);
    this.imgUrl = `http://localhost:5000/uploads/${this.profileData?.profileImage}`;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUserProfile(): void {
    const userId = this.profileData._id;

    const formData = new FormData();
    formData.append('firstname', this.profileData.firstname);
    formData.append('lastname', this.profileData.lastname);
    formData.append('email', this.profileData.email);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    formData.append('cardNumber', this.cardNumber || '');
  formData.append('cardHolderName', this.cardHolderName || '');
  formData.append('expirationDate', this.expirationDate || '');
  formData.append('cvv', this.cvv || '');

    this.service.updateUserProfile(userId, formData).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);

        
        this.loadUserProfile();
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
  toggleCardDetailsForm(): void {
    this.showCardDetailsForm = !this.showCardDetailsForm;
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
//   imgUrl: any;

//   constructor(private router: Router, private service: ServiceService) {}

//   ngOnInit(): void {
//     this.loadUserProfile();
//   }

//   loadUserProfile(): void {
//     const data: any = localStorage.getItem('user');
//     this.profileData = JSON.parse(data);
//     this.imgUrl = `http://localhost:5000/uploads/${this.profileData?.profileImage}`;
//   }

//   onFileSelected(event: any): void {
//     const file: File = event.target.files[0];

//     if (file) {
//       this.selectedFile = file;
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.imgUrl = e.target.result;
//         this.uploadPhoto(file);
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   uploadPhoto(file: File): void {
//     const formData = new FormData();
//     formData.append('file', file);

//     this.service.uploadPhoto(formData).subscribe(
//       (response) => {
//         console.log('Photo uploaded successfully:', response);

//         // Update user's profile image in localStorage or wherever needed
//         this.profileData.profileImage = response.photoUrl;

//         // Update user's profile image in MongoDB (if necessary)
//         this.updateUserProfile();
//       },
//       (error) => {
//         console.error('Error uploading profile picture:', error);
//       }
//     );
//   }

  
//   updateUserProfile(): void {
//     const userId = this.profileData._id;
  
//     const formData = new FormData();
  
//     // Append user data to formData
//     formData.append('firstname', this.profileData.firstname);
//     formData.append('lastname', this.profileData.lastname);
//     formData.append('email', this.profileData.email);
  
//     // Check if a file is selected before appending to FormData
//     if (this.selectedFile) {
//       formData.append('file', this.selectedFile);
//     }
  
//     this.service.updateUserProfile(userId, formData).subscribe(
//       (response) => {
//         console.log('Profile updated successfully:', response);
  
//         // Optionally, update other properties if needed
  
//         // Reload user profile to display the updated image
//         this.loadUserProfile();
//       },
//       (error) => {
//         console.error('Error updating profile:', error);
//       }
//     );
//   }
  
  
// }


