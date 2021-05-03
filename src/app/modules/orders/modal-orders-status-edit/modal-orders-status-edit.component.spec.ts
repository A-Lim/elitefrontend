import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdersStatusEditComponent } from './modal-orders-status-edit.component';

describe('ModalOrdersStatusEditComponent', () => {
  let component: ModalOrdersStatusEditComponent;
  let fixture: ComponentFixture<ModalOrdersStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrdersStatusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrdersStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
