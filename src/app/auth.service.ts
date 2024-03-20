import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  private user: any = null;
  

  constructor(private http: HttpClient, private router:Router) { }

  login(credentials: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials)
    .pipe(
      tap((response: any) => {
        // set token expiry
        if (response && response.token) {
          const expiresIn = 60 * 1000; // 1min expiry
          const expirationTime = new Date().getTime() + expiresIn;
          localStorage.setItem('token', response.token);
          localStorage.setItem('tokenExpiration', expirationTime.toString());
        }
      })
    );
}
saveToken(token: string): void {
  localStorage.setItem('token', token);
}

saveUser(user: any): void {
  localStorage.setItem('user', JSON.stringify(user));
}

getData():Observable<any> {
  const headers = this.getHeaders();
  return this.http.get(`${this.apiUrl}/getData`, {headers});
}

  isLoggedIn(): boolean {
    if( !!localStorage.getItem('token')) {
      if(this.isTokenNotExpired()){
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
  getUserEmail():Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/profile`, {headers});
  }


  // getSecureData(): Observable<any>{
  //   const headers = this.getHeaders();
  //   return this.http.get(`${this.apiUrl}/getData`, {headers});
  // }

  logout(): void {
    // Clear token and expiration time on logout
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
    
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  
  }
  
  

  
  // private showTokenExpiredAlert(): void {
  //   // You can use a library like SweetAlert or the built-in alert
  //   alert('Token has expired. Please log in again.');
  //   this.router.navigate(['/login']);

  // }
}