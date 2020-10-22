import { Component, OnInit, OnDestroy } from '@angular/core';
import { Base } from 'app/shared/components/base.component';

@Component({
  selector: 'users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent extends Base implements OnInit, OnDestroy {

  constructor() { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
