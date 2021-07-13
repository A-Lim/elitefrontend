import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { ViewComponent } from 'app/modules/pdfviewer/view/view.component';

const routes: Routes = [
  { 
    path: '', 
    component: ViewComponent, 
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfViewerRoutingModule { }
