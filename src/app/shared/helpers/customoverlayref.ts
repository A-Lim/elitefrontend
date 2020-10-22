import { Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { TemplateRef, Type } from '@angular/core';
import { ModalSize } from 'app/shared/models/modalsize.enum';

export interface ModalCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data: R;
}

// R = Response Data Type, T = Data passed to Modal Type
export class CustomOverlayRef<R = any, T = any> {
  afterClosed$ = new Subject<ModalCloseEvent<R>>();

  constructor(
    public overlay: OverlayRef,
    public content: string | TemplateRef<any> | Type<any>,
    public data: T ,// pass data to modal i.e. FormData,
    public size: ModalSize = ModalSize.Large
  ) {
    overlay.backdropClick().subscribe(() => { this._close('backdropClick', null) });
  }

  close(data?: R) {
    this._close('close', data);
  }

  private _close(type: 'backdropClick' | 'close', data: R) {
    // remove class to hide the delay during dispose
    this.overlay.backdropElement.classList.remove('modal-backdrop');
    this.overlay.dispose();
    this.afterClosed$.next({ type, data });
    this.afterClosed$.complete();
  }
}