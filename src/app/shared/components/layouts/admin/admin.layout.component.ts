import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin.layout.component.html',
  styleUrls: ['./admin.layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.removeClass(document.body, '1-column');
    this.renderer.removeClass(document.body, 'blank-page');
    this.renderer.removeClass(document.body, 'bg-full-screen-image');
    this.renderer.addClass(document.body, '2-column');
    this.renderer.setAttribute(document.body, 'data-col', '2-columns');
  }

}
