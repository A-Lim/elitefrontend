import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public appName: string = null;
  public year: number = 0;

  constructor() {
    this.appName = environment.name;
    this.year = (new Date()).getFullYear();
  }

  ngOnInit() {
  }

}
