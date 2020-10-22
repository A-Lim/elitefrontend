import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertType, Alert } from '../models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertBS = new BehaviorSubject<Alert>(null);
  private keepAfterRouteChange = false;

  // hide alert after a certain time of delay
  hideAfterDelay: boolean = true;

  alert$ = this.alertBS.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  success(message: any, hideAfterDelay: boolean = true, keepAfterRouteChange: boolean = false) {
    this.hideAfterDelay = hideAfterDelay;
    this.keepAfterRouteChange = keepAfterRouteChange;
    const alert = <Alert>{ type: AlertType.success, message };
    this.alertBS.next(alert);
  }

  error(message: any, hideAfterDelay: boolean = true, keepAfterRouteChange: boolean = false) {
    this.hideAfterDelay = hideAfterDelay;
    this.keepAfterRouteChange = keepAfterRouteChange;
    const alert = <Alert>{ type: AlertType.error, message };
    this.alertBS.next(alert);
  }

  clear() {
    this.alertBS.next(null);
  }
}