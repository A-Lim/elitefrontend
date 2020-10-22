import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { App } from 'app/configs/app.config';
import { DynamicScriptLoaderService } from 'app/shared/services/dynamicscriptloader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle(`${App.NAME} | Dashboard`);
  }
}
