import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      this.token = params['token']; 
    });
  }

  onSubmit() {
    this.resetPassword(this.token, this.newPassword).subscribe(
      (response: any) => {
        this.message = response; 
      
        this.router.navigate(['/login'], { queryParams: { reset: 'success' } });
      },
      (error: any) => {
        console.error('Reset Password Error:', error);
        this.message = error.error.message || 'An unexpected error occurred';
      }
    );
  }
  

  resetPassword(token: string, newPassword: string) {
    return this.http.post('http://localhost:8080/api/users/resetpassword', { resetPasswordToken: token, newPassword }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

