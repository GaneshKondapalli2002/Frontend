import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionExpiryModalComponent } from './session-expiry-modal/session-expiry-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  private sessionTimer: any;

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          const expiresIn = 120 * 1000; // 2 minutes
          const expirationTime = new Date().getTime() + expiresIn;
          localStorage.setItem('token', response.token);
          localStorage.setItem('tokenExpiration', expirationTime.toString());
          this.startSessionTimer(expiresIn); // Pass expiresIn to start session timer
        }
      })
    );
  }
  
  private startSessionTimer(timeoutDuration: number): void {
    // Clear existing session timer
    this.clearSessionTimer();

    // Start session timer with a duration slightly before the actual session expiry
    this.sessionTimer = setTimeout(() => {
      this.showSessionExpiryModal(); // Show session expiry modal before session expires
    }, timeoutDuration - 10000); // Trigger modal 10 seconds before session expiry
  }

  private clearSessionTimer(): void {
    clearTimeout(this.sessionTimer);
  }

  private showSessionExpiryModal(): void {
    // Open session expiry modal
    this.modalService.open(SessionExpiryModalComponent);
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/getData`, { headers });
  }

  isLoggedIn(): boolean {
    if (!!localStorage.getItem('token')) {
      if (this.isTokenNotExpired()) {
        return true;
      } else {
        this.logout();
        return false;
      }
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  private isTokenNotExpired(): boolean {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      return currentTime < parseInt(expirationTime, 10);
    }
    return false;
  }

  private setTokenExpiration(expirationTime: number): void {
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserEmail(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  logout(): void {
    // Clear token and expiration time on logout
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.clearSessionTimer();

  }
}
