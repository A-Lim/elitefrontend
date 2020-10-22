import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default.layout.component.html',
  styleUrls: ['./default.layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, '1-column');
    this.renderer.addClass(document.body, 'blank-page');
    this.renderer.addClass(document.body, 'bg-full-screen-image');
    this.renderer.removeClass(document.body, '2-column');
    this.renderer.setAttribute(document.body, 'data-col', '1-column');
  }
}
