import { Directive, Input } from '@angular/core';
import { ValidationErrors, AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[fileTypes]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: FileTypesValidator, 
    multi: true
  }]
})
export class FileTypesValidator implements Validator {
  @Input() 
  fileTypes: string[];

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value == null || control.value == '')
      return null;

    const fileList: FileList = control.value;

    for (let i = 0; i < fileList.length; i++) {
      const fileExt = fileList[i].name.split('.').pop(); 
      
      if (!this.fileTypes.includes(`.${fileExt}`))
        return { fileTypes : true };
    }
    return null;
  }
}