import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { UserService } from '../../services/user.service'; // Adjust the path as necessary
import { User } from '../../model/user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], // Importing FormsModule for two-way data binding
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class RegisterComponent {
  user: User = { // Creating user object with fields for saving in database
    fname: '',
    lname: '',
    email: '',
    phonenumber: '',
    dob: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    gradeOrYearLevel: '',
    gpaScore: '',
    gwaPercentile: '',
    expectedGraduationDate: '',
    schoolName: '',
    department: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {} // Injecting UserService and Router

  validateGwaPercentile(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value !== null && value !== undefined && (value < 50 || value > 100)) {
      return { 'invalidGwa': true };
    }
    return null; 
  }

  onGwaChange(control: AbstractControl): void {
    control.setValidators([this.validateGwaPercentile]);
    control.updateValueAndValidity(); 
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.userService.register(this.user).subscribe(
        (response: HttpResponse<any>) => {
          if (response.body && response.body.message) {
            console.log('Toaster should show success');
            this.showToasterMessage(response.body.message, 'success');
            this.resetForm(f);
            this.router.navigate(['/login']); // Redirecting to the login page
          }
        },
        (error: HttpErrorResponse) => {
          if (error.error && error.error.error) {
            console.log('Toaster should show error');
            this.showToasterMessage(error.error.error, 'error');
            this.resetForm(f);
          }
        }
      );
    }
  }

  showToaster: boolean = false;
  toasterMessage: string = '';
  toasterType: string = '';

  // Toaster display logic
  showToasterMessage(message: string, type: string) {
    this.toasterMessage = message;
    this.toasterType = type;
    this.showToaster = true;

    // Hide the toaster after 3 seconds
    setTimeout(() => {
      this.showToaster = false;
    }, 3000);
  }

  resetForm(f: NgForm) {
    f.resetForm(); // Reset the form controls
    this.user = { // Resetting the user object
      fname: '',
      lname: '',
      email: '',
      phonenumber: '',
      dob: '',
      addressLine: '',
      city: '',
      state: '',
      postalCode: '',
      gradeOrYearLevel: '',
      gpaScore: '',
      gwaPercentile: '',
      expectedGraduationDate: '',
      schoolName: '',
      department: '',
      password: ''
    };
  }
}
