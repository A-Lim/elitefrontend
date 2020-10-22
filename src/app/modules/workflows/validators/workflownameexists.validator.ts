import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';

import { WorkflowService } from 'app/modules/workflows/workflows.service';

@Directive({
  selector: '[workflowNameExists]',
  providers: [{ 
    provide: NG_ASYNC_VALIDATORS, 
    useExisting: WorkflowNameExistsValidator, 
    multi: true
  }]
})
export class WorkflowNameExistsValidator implements AsyncValidator {
  @Input()
  workflowId: number;

  constructor(private workflowSvc: WorkflowService) {
  }
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(600),
      switchMap(name => this.workflowSvc.isNameExists(name, this.workflowId)
        .pipe(map(result => {
          if (result.data)
            return <ValidationErrors> { workflowNameExists: true };
          else 
            return null;
        }))
      )
    );
  }
}