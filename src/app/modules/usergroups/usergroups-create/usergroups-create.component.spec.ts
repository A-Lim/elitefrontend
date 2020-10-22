import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsCreateComponent } from './usergroups-create.component';

describe('UserGroupsCreateComponent', () => {
  let component: UserGroupsCreateComponent;
  let fixture: ComponentFixture<UserGroupsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
