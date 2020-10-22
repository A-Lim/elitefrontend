import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsCreateGeneralTabComponent } from './usergroups-create-general-tab.component';

describe('UserGroupsCreateGeneralTabComponent', () => {
  let component: UserGroupsCreateGeneralTabComponent;
  let fixture: ComponentFixture<UserGroupsCreateGeneralTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsCreateGeneralTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsCreateGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
