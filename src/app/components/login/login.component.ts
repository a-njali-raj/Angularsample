import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };
  loginError: string = ''; 
  successMessage: string = ''; 
  errorMessage: string = ''; 

  toasterMessage: string = '';
  showToaster: boolean = false;
  isSuccess: boolean = true;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      if (params['reset'] === 'success') {
        this.showToasterMessage('Password reset successfully!', true);
      }
    });
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.userService.login(this.user).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          if (response && response.message && response.status === 200) {
            this.userService.markUserAsLoggedIn();
            this.router.navigate(['/welcome']); 
          } else {
            this.showToasterMessage('Unexpected response from server.', false);
          }
        },
        (error: any) => {
          console.error('Login error:', error);
          this.showToasterMessage(error.error?.error || 'An unknown error occurred.', false);
          this.loginError = error.error?.error || 'An unknown error occurred.';
        }
      );
    }
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
