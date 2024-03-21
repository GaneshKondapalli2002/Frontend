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
import { catchError, timeout, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add a timeout
    const clonedRequest = request.clone();

    // Continue with the request and add a timeout
    return next.handle(clonedRequest).pipe(
      timeout(60000), // Timeout of 60 seconds
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
    // Clear token and expiration time on logout
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
    // Redirect to login page
    this.router.navigate(['/login']);
    // Display alert for expired token
    alert('Your session has expired. Please log in again.');
  }

  private handleTimeout(): void {
    // Redirect to login page or any other handling
    this.router.navigate(['/login']);
    // Display alert for timeout
    alert('Request timed out. Please try again.');
  }
}
