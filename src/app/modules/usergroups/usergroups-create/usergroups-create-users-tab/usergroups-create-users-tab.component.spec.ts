import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsCreateUsersTabComponent } from './usergroups-create-users-tab.component';

describe('UserGroupsCreateUsersTabComponent', () => {
  let component: UserGroupsCreateUsersTabComponent;
  let fixture: ComponentFixture<UserGroupsCreateUsersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsCreateUsersTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsCreateUsersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
