import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { AlertService } from 'app/shared/services/alert.service';
import { delay, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>(); 

  messages: string[];
  type: string;

  clearSub = new Subject<void>();
  clear$ = this.clearSub.asObservable();

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.alert$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data) {
          this.type = data.type;
          // check if data type
          // convert them all string array
          if (data.message instanceof HttpErrorResponse) {
            this.messages = [data.message.message];
          } else if (data.message instanceof Array) {
            this.messages = data.message
          } else {
            this.messages = [data.message];
          }

          if (this.alertService.hideAfterDelay)
            this.clearSub.next();
            
        } else {
          this.messages = null;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
