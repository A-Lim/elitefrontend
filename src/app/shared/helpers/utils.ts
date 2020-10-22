import { AbstractControl } from '@angular/forms';

export default class Utils {

  static deleteError(formControl: AbstractControl, error: string) {
    if (formControl.hasError(error))
      delete formControl.errors[error];

    if (Utils.isEmpty(formControl.errors))
      formControl.setErrors(null) 
  }

  static isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
  }
}