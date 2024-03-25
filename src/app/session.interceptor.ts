  import { Injectable } from '@angular/core';
  import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { catchError, timeout} from 'rxjs/operators';
  import { Router } from '@angular/router';
   import { SessionExpiryModalComponent } from './session-expiry-modal/session-expiry-modal.component';


  @Injectable()
  export class SessionInterceptor implements HttpInterceptor {
    private sessionExpiryTime: number = 0; // Initialize session expiry time

    constructor(private router: Router, 
      //private modalSer vice: NgbModal
      ) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Clone the request to add a timeout
      const clonedRequest = request.clone();
  
      // Continue with the request and add a timeout
      return next.handle(clonedRequest).pipe(
        timeout(1200000), // Timeout of 120 seconds
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              // Unauthorized - Token expired or invalid
              console.error('Unauthorized request. Token expired or invalid.');
              this.handleUnauthorizedRequest();
            } else if (error.status === 0) {
              // Timeout error
              console.error('Request timed out');
              this.handleTimeout();
            }
          }
          return throwError(error);
        })
      );
    }
  
    private handleUnauthorizedRequest(): void {
      // Open session expir//y modal
     // this.modalService.open(SessionExpiryModalComponent);
      // Clear token and expiration time on logout
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('user');
      // Redirect to login page
      this.router.navigate(['/login']);
    }
  
    private handleTimeout(): void {
      // Check if remaining session expiry time is less than 10 seconds
      if (this.sessionExpiryTime - Date.now() < 10000) {
        // Open session expiry //modal
       // this.modalService.open(SessionExpiryModalComponent);
        // Redirect to login page or any other handling
        this.router.navigate(['/login']);
      }
    }
  
    // Method to set session expiry time
    setSessionExpiryTime(expiryTime: number): void {
      this.sessionExpiryTime = expiryTime;
    }
  }