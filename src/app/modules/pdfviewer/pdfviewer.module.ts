import { NgModule } from '@angular/core';
import { PdfViewerModule as Ng2PdfViewerModule } from 'ng2-pdf-viewer';

import { ViewComponent } from 'app/modules/pdfviewer/view/view.component';
import { PdfViewerRoutingModule } from 'app/modules/pdfviewer/pdfviewer.routing';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    PdfViewerRoutingModule,
    Ng2PdfViewerModule
  ],
})
export class PdfViewerModule { }
