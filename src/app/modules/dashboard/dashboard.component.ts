import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Base } from 'app/shared/components/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends Base implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.setTitle('Dashboard');
  }
}
