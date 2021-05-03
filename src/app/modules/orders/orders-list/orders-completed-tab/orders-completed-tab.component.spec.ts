import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCompletedTabComponent } from './orders-completed-tab.component';

describe('OrdersCompletedTabComponent', () => {
  let component: OrdersCompletedTabComponent;
  let fixture: ComponentFixture<OrdersCompletedTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersCompletedTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCompletedTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
