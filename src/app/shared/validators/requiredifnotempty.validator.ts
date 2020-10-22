import { Directive, Input } from '@angular/core';
import { ValidationErrors, Validator, NG_VALIDATORS, FormGroup, Validators } from '@angular/forms';
import Utils from 'app/shared/helpers/utils';

@Directive({
  selector: 'form [requiredIfEitherNotEmpty]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: RequiredIfEitherNotEmptyValidator, 
    multi: true
  }]
})
// make both formcontrols required if either one of them is empty
export class RequiredIfEitherNotEmptyValidator implements Validator {
  @Input('requiredIfEitherNotEmpty') requiredIfEitherNotEmpty: string[];

  validate(formGroup: FormGroup): ValidationErrors | null {
    if (!this.requiredIfEitherNotEmpty)
      return;

    if (this.requiredIfEitherNotEmpty.length != 2)
      throw new Error('Invalid parameter passed in for requiredIf validator.');

    const firstControl = formGroup.controls[this.requiredIfEitherNotEmpty[0]];
    const secondControl = formGroup.controls[this.requiredIfEitherNotEmpty[1]] ;

    if (!firstControl || !secondControl)
      return;

    if ((firstControl.value != null && firstControl.value !== '') && 
      (secondControl.value == null || secondControl.value === ''))
      secondControl.setErrors({ requiredIfEitherNotEmpty: true });  
    else
      Utils.deleteError(secondControl, 'requiredIfEitherNotEmpty');

    if ((secondControl.value != null && secondControl.value !== '') && 
      (firstControl.value == null || firstControl.value === ''))
      firstControl.setErrors({ requiredIfEitherNotEmpty: true });  
    else
      Utils.deleteError(firstControl, 'requiredIfEitherNotEmpty');
  }
}