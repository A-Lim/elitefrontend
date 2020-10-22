import { Directive } from '@angular/core';
import { ValidationErrors, AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[isInteger]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: IsIntegerValidator, 
    multi: true
  }]
})
export class IsIntegerValidator implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value == null || control.value == '')
      return null

    if (!this.isInt(control.value))
      return { 'isInteger' : true };
          
    return null;
  }

  private isInt(value) {
    var x;
    if (isNaN(value)) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
  }
}