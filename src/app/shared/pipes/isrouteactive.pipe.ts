import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({ name: 'isrouteactive' })
export class IsRouteActivePipe implements PipeTransform {

  constructor(private router: Router) {
  }

  transform(url: string): boolean {
    return this.router.url === url;
  }
}