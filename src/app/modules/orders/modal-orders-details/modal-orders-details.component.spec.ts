import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdersDetailsComponent } from './modal-orders-details.component';

describe('ModalOrdersDetailsComponent', () => {
  let component: ModalOrdersDetailsComponent;
  let fixture: ComponentFixture<ModalOrdersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrdersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
