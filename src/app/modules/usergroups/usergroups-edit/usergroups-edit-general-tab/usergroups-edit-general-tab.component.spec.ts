import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsEditGeneralTabComponent } from './usergroups-edit-general-tab.component';

describe('UserGroupsEditGeneralTabComponent', () => {
  let component: UserGroupsEditGeneralTabComponent;
  let fixture: ComponentFixture<UserGroupsEditGeneralTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsEditGeneralTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsEditGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
