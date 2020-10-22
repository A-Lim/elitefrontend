import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsEditComponent } from './workflows-edit.component';

describe('WorkflowsEditComponent', () => {
  let component: WorkflowsEditComponent;
  let fixture: ComponentFixture<WorkflowsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
