import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditGeneralTabComponent } from './users-edit-general-tab.component';

describe('UsersEditGeneralTabComponent', () => {
  let component: UsersEditGeneralTabComponent;
  let fixture: ComponentFixture<UsersEditGeneralTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEditGeneralTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
