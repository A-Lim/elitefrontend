import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsEditComponent } from './usergroups-edit.component';

describe('UserGroupsEditComponent', () => {
  let component: UserGroupsEditComponent;
  let fixture: ComponentFixture<UserGroupsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
