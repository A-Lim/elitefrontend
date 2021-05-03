import { Directive, Input } from '@angular/core';
import { ValidationErrors, AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: 'shared-datepicker [required]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: DateRequiredValidator, 
    multi: true
  }]
})
export class DateRequiredValidator implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value == null || control.value == '')
      return { required: true };

    return null;
  }
}