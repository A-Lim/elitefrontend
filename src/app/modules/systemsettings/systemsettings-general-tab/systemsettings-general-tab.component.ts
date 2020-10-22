import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'app/shared/components/baseform.component';

@Component({
  selector: 'systemsettings-general-tab',
  templateUrl: './systemsettings-general-tab.component.html',
  styleUrls: ['./systemsettings-general-tab.component.css']
})
export class SystemSettingsGeneralTabComponent extends BaseFormComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

  onSubmit() {
    super.onSubmit();
  }

}
