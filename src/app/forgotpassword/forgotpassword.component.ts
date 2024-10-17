import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.forgotPassword(this.email).subscribe(
        (response: any) => {
          console.log('Success response:', response);
          this.message = response.message || 'Password reset link has been sent.';
        },
        (error: any) => {
          console.error('Forgot Password Error:', error);
          this.message = this.getErrorMessage(error); 
        }
      );
    }
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/forgotpassword', { email }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(err => {
        console.error('Error in HTTP call:', err);
        return throwError(err);
      })
    );
  }

  private getErrorMessage(err: any): string {
    if (err.error) {
      console.log('Error response:', err.error);
      if (typeof err.error.message === 'string') {
        return err.error.message; 
      } else {
        return 'An unexpected error occurred'; 
      }
    } else if (typeof err.message === 'string') {
      return err.message; 
    } else {
      return 'An unexpected error occurred'; 
    }
  }
}
