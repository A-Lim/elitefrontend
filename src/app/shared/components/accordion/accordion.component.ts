import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'shared-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit {

  @Input()
  open: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.open = !this.open;
  }

}
