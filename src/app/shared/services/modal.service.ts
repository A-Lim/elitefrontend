import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { DefaultModalComponent } from 'app/shared/components/modal/default.modal.component';
import { ModalSize } from 'app/shared/models/modalsize.enum';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(content: string | TemplateRef<any> | ComponentType<any>, data: T, size: ModalSize = ModalSize.Large): CustomOverlayRef<R> {
    const configs = new OverlayConfig(this.defaultConfig);
    const overlayRef = this.overlay.create(configs);

    const customOverlayRef = new CustomOverlayRef<R, T>(overlayRef, content, data, size);

    const injector = this.createInjector(customOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(DefaultModalComponent, null, injector));

    return customOverlayRef;
  }

  createInjector(ref: CustomOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[CustomOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }

  get defaultConfig() {
    return {
      hasBackdrop: true,
      panelClass: [],
      backdropClass: ['modal-backdrop'],
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    };
  }
}