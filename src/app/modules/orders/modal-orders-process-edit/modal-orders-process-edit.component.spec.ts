import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdersProcessEditComponent } from './modal-orders-process-edit.component';

describe('ModalOrdersProcessEditComponent', () => {
  let component: ModalOrdersProcessEditComponent;
  let fixture: ComponentFixture<ModalOrdersProcessEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrdersProcessEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrdersProcessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
