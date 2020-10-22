import { Component, OnInit, TemplateRef, Type, HostListener } from '@angular/core';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { ModalSize } from 'app/shared/models/modalsize.enum';

@Component({
  selector: 'shared-default-modal',
  templateUrl: './default.modal.component.html',
  styleUrls: ['./default.modal.component.scss']
})
export class DefaultModalComponent implements OnInit {
  contentType: 'template' | 'string' | 'component';
  content: string | TemplateRef<any> | Type<any>;
  context: any;
  size: ModalSize;

  constructor(private ref: CustomOverlayRef) {}

  @HostListener('document:keydown.escape', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    this.ref.close(null);
  }

  close() {
    this.ref.close(null);
  }

  ngOnInit() {
    this.content = this.ref.content;
    this.size = this.ref.size;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }

  get ModalSize() {
    return ModalSize;
  }
}