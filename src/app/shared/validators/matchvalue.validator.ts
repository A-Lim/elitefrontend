import { Directive, Input } from '@angular/core';
import { ValidationErrors, Validator, NG_VALIDATORS, FormGroup } from '@angular/forms';
import Utils from 'app/shared/helpers/utils';

@Directive({
  selector: 'form [matchValue]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: MatchValueValidator, 
    multi: true
  }]
})
export class MatchValueValidator implements Validator {
  @Input('matchValue') matchValue: string[];

  validate(formGroup: FormGroup): ValidationErrors | null {
    if (!this.matchValue)
      return;

    if (this.matchValue.length != 2)
      throw new Error('Invalid parameter passed in for mustMatch validator.');

    const firstControl = formGroup.controls[this.matchValue[0]];
    const secondControl = formGroup.controls[this.matchValue[1]];

    if (!firstControl || !secondControl)
      return;

    if ((firstControl.value == null && secondControl.value == '') ||
      (firstControl.value == '' && secondControl.value == null) || 
      (firstControl.value === secondControl.value)) 
      Utils.deleteError(secondControl, 'matchValue');
    else
      secondControl.setErrors({ matchValue: true });
  }
}