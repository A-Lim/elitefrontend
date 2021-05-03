import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'app/modules/dashboard/dashboard.service';
import { GeneralStat } from 'app/modules/dashboard/models/generalstat.model';

@Component({
  selector: 'widget-general',
  templateUrl: './widget-general.component.html',
  styleUrls: ['./widget-general.component.css']
})
export class WidgetGeneralComponent implements OnInit {

  isLoading: boolean = false;
  generalStat: GeneralStat;
  
  constructor(private dashboardSvc: DashboardService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getStats();
  }

  getStats() {
    this.isLoading = true;
    this.dashboardSvc.getStats()
      .subscribe(response => {
        this.isLoading = false;
        this.generalStat = response.data;
      });
  }
}
