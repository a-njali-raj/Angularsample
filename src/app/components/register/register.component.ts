import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service'; // Adjust the path as necessary
import { User } from '../../model/user';
import { NgForm } from '@angular/forms'; 
import { HttpErrorResponse,HttpResponse } from '@angular/common/http';// Import the User model (adjust path as necessary)

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

  constructor(private userService: UserService) {} // Injecting UserService

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
          }
        },
        (error: HttpErrorResponse) => {
          if (error.error && error.error.error) {
            console.log('Toaster should show error');
            this.showToasterMessage(error.error.error, 'error');
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
}  