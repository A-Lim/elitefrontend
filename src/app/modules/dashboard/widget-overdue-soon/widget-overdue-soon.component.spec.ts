import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetOverDueSoonComponent } from './widget-overdue-soon.component';

describe('WidgetOverDueSoonComponent', () => {
  let component: WidgetOverDueSoonComponent;
  let fixture: ComponentFixture<WidgetOverDueSoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetOverDueSoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetOverDueSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
