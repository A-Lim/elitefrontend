import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from 'app/modules/dashboard/dashboard.service';
import { OverdueSoonOrder } from 'app/modules/dashboard/models/overduesoonorders.model';

@Component({
  selector: 'widget-overdue-soon',
  templateUrl: './widget-overdue-soon.component.html',
  styleUrls: ['./widget-overdue-soon.component.css']
})
export class WidgetOverDueSoonComponent implements OnInit {
  filterRange: string = 'week';

  isLoading: boolean = false;
  overDueSoonOrders: OverdueSoonOrder[];
  
  constructor(private router: Router,
    private dashboardSvc: DashboardService) {
  }

  ngOnInit() {
    this.getOverdueSoonOrders();
  }

  getOverdueSoonOrders() {
    this.isLoading = true;
    this.dashboardSvc.getOverdueSoonOrders(this.filterRange)
      .subscribe(response => {
        this.isLoading = false;
        this.overDueSoonOrders = response.data;
      });
  }

  onFilterRangeChanged(filterRange: string) {
    this.filterRange = filterRange;
    this.getOverdueSoonOrders();
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
