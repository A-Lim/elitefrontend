import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  url: string;
  rotation = 0;
  zoom = 1;
  zoomPercentage = 100;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.url = params.url);
  }

  rotate() {
    if (this.rotation == 270)
      this.rotation = 0;
    else
      this.rotation += 90;
  }

  zoomIn() {
    if (this.zoom == 0.1)
      return;

    this.zoom += 0.1;
    this.zoomPercentage = Math.round(this.zoom * 100);
  }

  zoomOut() {
    if (this.zoom == 1.9)
      return;

    this.zoom -= 0.1;
    this.zoomPercentage = Math.round(this.zoom * 100);
  }
}
