import { HttpErrorResponse } from '@angular/common/http';

export interface Alert {
  type: string;
  message: string|[string]|HttpErrorResponse;
}

export enum AlertType {
  success = 'success',
  error = 'error',
}