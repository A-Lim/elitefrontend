import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedContentComponent } from './authorized-content.component';

describe('AuthorizedContentComponent', () => {
  let component: AuthorizedContentComponent;
  let fixture: ComponentFixture<AuthorizedContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizedContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
