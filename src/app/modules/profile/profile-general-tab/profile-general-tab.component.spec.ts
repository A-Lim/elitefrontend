import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGeneralTabComponent } from './profile-general-tab.component';

describe('ProfileGeneralTabComponent', () => {
  let component: ProfileGeneralTabComponent;
  let fixture: ComponentFixture<ProfileGeneralTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileGeneralTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
