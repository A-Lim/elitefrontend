import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({ name: 'isrouteactive' })
export class IsRouteActivePipe implements PipeTransform {

  constructor(private router: Router) {
  }

  transform(url: string, strict: boolean = true): boolean {
    if (strict)
      return this.router.url === url;
    else
      return url.includes(this.router.url);
  }
}