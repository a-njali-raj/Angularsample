import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { HttpErrorResponse } from '@angular/common/http'; 

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
  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    }).pipe(
      catchError(err => {
        console.error('Login Error:', err);
        return throwError(this.getErrorMessage(err));
      })
    );
  }



  forgotPassword(email: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/forgotpassword', { email })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
         
            console.error('User not found with the provided email address.');
          }
          return throwError(error);
        })
      );
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/resetpassword`, { resetPasswordToken: token, newPassword }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Reset Password Error:', error.message || error.statusText);
        return throwError(error);
      })
    );
  }

  private getErrorMessage(err: any): string {
    if (err.error instanceof ErrorEvent) {
      
      return `Error: ${err.error.message}`;
    } else {
     
      return `Error ${err.status}: ${err.message || 'Unknown error'}`;
    }
  }
}
