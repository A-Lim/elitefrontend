import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';

import { OrderService } from 'app/modules/orders/orders.service';

@Directive({
  selector: '[orderIWOExists]',
  providers: [{ 
    provide: NG_ASYNC_VALIDATORS, 
    useExisting: OrderIWOExistsValidator, 
    multi: true
  }]
})
export class OrderIWOExistsValidator implements AsyncValidator {
  @Input()
  workflowId: number;

  @Input()
  orderId: number;

  constructor(private orderSvc: OrderService) {
  }
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(600),
      switchMap(iwo => this.orderSvc.isIWOExists(this.workflowId, iwo, this.orderId)
        .pipe(map(result => {
          if (result.data)
            return <ValidationErrors> { orderIWOExists: true };
          else 
            return null;
        }))
      )
    );
  }
}