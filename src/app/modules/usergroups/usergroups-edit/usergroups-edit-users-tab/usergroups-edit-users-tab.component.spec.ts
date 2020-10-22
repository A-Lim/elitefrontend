import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsEditUsersTabComponent } from './usergroups-edit-users-tab.component';

describe('UserGroupsEditUsersTabComponent', () => {
  let component: UserGroupsEditUsersTabComponent;
  let fixture: ComponentFixture<UserGroupsEditUsersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsEditUsersTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsEditUsersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
