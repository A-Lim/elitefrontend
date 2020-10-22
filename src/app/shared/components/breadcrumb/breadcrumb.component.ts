import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadCrumb } from 'app/shared/models/breadcrumb.model';

@Component({
  selector: 'shared-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadCrumbComponent implements OnInit {
  homeUrl: string = '/admin/dashboard';
  module: string;
  breadcrumbs: BreadCrumb[];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    if (route.routeConfig?.data?.module)
      this.module = route.routeConfig.data.module;
      
    // If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && 
                route.routeConfig.data && 
                route.routeConfig.data?.breadcrumb 
                  ? route.routeConfig.data.breadcrumb : '';

    let path = route.routeConfig && 
              route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      // label = route.snapshot.params[paramName];
    }

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
        label: label,
        url: nextUrl,
    };

    const isNotDuplicate = breadcrumbs.findIndex(x => x.url === breadcrumb.url) === -1
    // Only adding route with non-empty label
    // And non-duplicate
    const newBreadcrumbs = breadcrumb.label && isNotDuplicate
      ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
    if (route.firstChild) {
        // If we are not on our current path yet,
        // there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
