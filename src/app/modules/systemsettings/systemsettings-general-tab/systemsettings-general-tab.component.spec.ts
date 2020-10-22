import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsettingsGeneralTabComponent } from './systemsettings-general-tab.component';

describe('SystemsettingsGeneralTabComponent', () => {
  let component: SystemsettingsGeneralTabComponent;
  let fixture: ComponentFixture<SystemsettingsGeneralTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemsettingsGeneralTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsettingsGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
