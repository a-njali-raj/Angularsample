import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
@Directive({
  selector: '[appPastDateValidator]',
  standalone: true
})
export class PastDateValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const enteredDate = new Date(control.value);
    const currentDate = new Date();
    
    // Check if the entered date is valid and in the past
    if (enteredDate && enteredDate >= currentDate) {
      return { pastDate: true };
    }
    return null;
  }