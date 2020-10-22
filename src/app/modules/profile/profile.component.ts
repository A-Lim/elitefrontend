import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Base } from 'app/shared/components/base.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends Base implements OnInit, OnDestroy {
  
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Product');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
