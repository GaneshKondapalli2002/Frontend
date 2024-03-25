import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-expiry-modal',
  templateUrl: './session-expiry-modal.component.html',
  styleUrls: ['./session-expiry-modal.component.scss']
})
export class SessionExpiryModalComponent {
  
  constructor(private router: Router) { }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
