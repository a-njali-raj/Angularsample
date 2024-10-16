import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule], //importing formsmodule for 2 way databinding (for property binding no need of this,just{{}})
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {                // creating user object with fields in form for  saving in database
    firstName:'',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    gradeOrYearLevel: '',
    gpaScore: null,
    gwaPercentile: null,
    expectedGraduationDate: '',
    schoolName: '',
    department: '',
    password: ''
  };


  validateGwaPercentile(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value !== null && value !== undefined && (value < 50 || value > 100)) {
      return { 'invalidGwa': true };  // Validation fails, return error object
    }
    return null;  // Validation passes
  }

  // Trigger validation on GWA change
  onGwaChange(control: AbstractControl): void {
    control.setValidators([this.validateGwaPercentile]);
    control.updateValueAndValidity();  // This will re-validate the control
  }

  // Custom Expected Graduation Date Validator
  validateExpectedGraduationDate(control: any): { [key: string]: boolean } | null {
    const graduationDate = new Date(control.value);
    const today = new Date();
    if (graduationDate < today) {
      return { 'invalidDate': true };
    }
    return null;
  }

 
}