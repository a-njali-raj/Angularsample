import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { HttpErrorResponse } from '@angular/common/http'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {}
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Registration Error:', err.message || err.statusText);
        return throwError(err);
      })
    );
  }
  // Login
  login(user: Pick<User, 'email' | 'password'>): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Ensure content type is JSON
      })
    }).pipe(
      catchError(err => {
        console.error('Login Error:', err);
        return throwError(this.getErrorMessage(err));
      })
    );
  }

  // Reset Password
  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { email }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(err => {
        console.error('Reset Password Error:', err);
        return throwError(this.getErrorMessage(err));
      })
    );
  }

  // Forgot Password
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(err => {
        console.error('Forgot Password Error:', err);
        return throwError(this.getErrorMessage(err));
      })
    );
  }

  // Get User Profile
  getUserProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`).pipe(
      catchError(err => {
        console.error('Get User Profile Error:', err);
        return throwError(this.getErrorMessage(err));
      })
    );
  }

  // Update User Profile
  updateUser(userId: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(err => {
        console.error('Update User Profile Error:', err);
        return throwError(this.getErrorMessage(err));
      })
    );
  }

  // Custom error handling function
  private getErrorMessage(err: any): string {
    if (err.error instanceof ErrorEvent) {
      // Client-side error
      return `Error: ${err.error.message}`;
    } else {
      // Server-side error
      return `Error ${err.status}: ${err.message || 'Unknown error'}`;
    }
  }
}
