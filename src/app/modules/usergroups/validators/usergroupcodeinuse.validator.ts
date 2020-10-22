import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';

import { UserGroupService } from 'app/modules/usergroups/usergroups.service';

@Directive({
  selector: '[userGroupCodeInUse]',
  providers: [{ 
    provide: NG_ASYNC_VALIDATORS, 
    useExisting: UserGroupCodeInUseValidator, 
    multi: true
  }]
})
export class UserGroupCodeInUseValidator implements AsyncValidator {
  @Input()
  userGroupId: number;

  constructor(private _userGroupSvc: UserGroupService) {
  }
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(600),
      switchMap(code => this._userGroupSvc.checkCodeExists(code, this.userGroupId)
        .pipe(map(result => {
          if (result.data)
            return <ValidationErrors> { userGroupCodeInUse: true };
          else 
            return null;
        }))
      )
    );
  }
}