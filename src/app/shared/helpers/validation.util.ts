import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export default class ValidationUtil {
  // check if first field matches the second field
  static matchValue(firstControlName: string, secondControlName: string) {
    return (formGroup: FormGroup) => {
      const firstControl = formGroup.controls[firstControlName];
      const secondControl = formGroup.controls[secondControlName];

      // return null if controls haven't initialised yet
      if (!firstControl || !secondControl || !firstControl.value) {
        secondControl.setErrors(null);
        return;
      }

      if (secondControl.errors && !secondControl.errors.matchValue) {
        secondControl.setErrors(null);
        return;
      }

      if (firstControl.value !== secondControl.value) {
        secondControl.setErrors({ matchValue: true });
      } else {
        secondControl.setErrors(null);
      }
    };
  }

  // validate second field as required if firstfield is not null
  static requiredIf(firstControlName: string, secondControlName: string) {
    return (formGroup: FormGroup) => {
      const firstControl = formGroup.controls[firstControlName];
      const secondControl = formGroup.controls[secondControlName];

      if (secondControl.errors && !secondControl.errors.requiredIf) {
        return null;
      }

      if (firstControl.value && !secondControl.value) {
        secondControl.setErrors({ requiredIf: true });
      } else {
        secondControl.setErrors(null);
      }
    };
  }

  // validate second field as required if based on value of first field
  static requiredIfValue(firstControlName: string, firstControlValue: any, secondControlName: string): ValidatorFn {
    return (formGroup: FormGroup) => {
      const firstControl = formGroup.controls[firstControlName];
      const secondControl = formGroup.controls[secondControlName];

      if (secondControl.errors && !secondControl.errors.requiredIf)
        return null;

      if (firstControl.value == firstControlValue && !secondControl.value)
        secondControl.setErrors({ requiredIfValue: true });
      else
        secondControl.setErrors(null);
    };
  }

  static isInt() {

  }

  static allowedFileTypes(types: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (!file)
        return null;

      const extension = file.name.split('.')[1].toLowerCase();
      if (!types.includes(extension))
        return { allowedFileTypes: true }
      
      return null;
    };
  }
}