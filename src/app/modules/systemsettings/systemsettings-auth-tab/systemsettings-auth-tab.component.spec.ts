import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsAuthTabComponent } from './systemsettings-auth-tab.component';

describe('SystemSettingsAuthTabComponent', () => {
  let component: SystemSettingsAuthTabComponent;
  let fixture: ComponentFixture<SystemSettingsAuthTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSettingsAuthTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsAuthTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
