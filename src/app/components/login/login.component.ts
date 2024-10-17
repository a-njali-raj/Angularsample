import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  loginError: string = ''; 
  successMessage: string = ''; 
  errorMessage: string = ''; 

  
  toasterMessage: string = '';
  showToaster: boolean = false;
  isSuccess: boolean = true;

  constructor(private http: HttpClient) {}

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.login(this.user).subscribe(
        (response: any) => {
          console.log('Login successful', response); 
          if (response && response.message && response.status === 200) {
          
            this.showToasterMessage(response.message, true);
            this.loginError = ''; 
            
          } else {
            this.showToasterMessage('Unexpected response from server.', false);
          }
        },
        (error: any) => {
          console.error('Login error:', error); // Log the error response
          console.log('Error status code:', error.status); // Log the status code
          this.showToasterMessage(error.error?.error || 'An unknown error occurred.', false);
          this.loginError = error.error?.error || 'An unknown error occurred.';
        }
      );
    }
  }
  

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/login', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Login Error:', err);
        return throwError(() => new Error(err.error?.error || 'Login failed, please try again.'));
      })
    );
  }


  showToasterMessage(message: string, success: boolean) {
    this.toasterMessage = message;
    this.isSuccess = success;
    this.showToaster = true;


    setTimeout(() => {
      this.showToaster = false;
    }, 3000);
  }
}
