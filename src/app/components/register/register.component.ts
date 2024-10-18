import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
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

  constructor(private userService: UserService, private router: Router) {}

  validateGwaPercentile(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value < 50 || value > 100) {
      return { invalidGwa: true };
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
            this.showToasterMessage(response.body.message, 'success');
            this.resetForm(f);
            this.router.navigate(['/login']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.error && error.error.error) {
            this.showToasterMessage(error.error.error, 'error');
            this.resetForm(f);
          }
        }
      );
    }
  }

  showToaster = false;
  toasterMessage = '';
  toasterType = '';

  showToasterMessage(message: string, type: string) {
    this.toasterMessage = message;
    this.toasterType = type;
    this.showToaster = true;
    setTimeout(() => {
      this.showToaster = false;
    }, 3000);
  }

  resetForm(f: NgForm) {
    f.resetForm();
    this.user = {
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
