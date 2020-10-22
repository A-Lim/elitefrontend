import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsCreateComponent } from './workflows-create.component';

describe('WorkflowsCreateComponent', () => {
  let component: WorkflowsCreateComponent;
  let fixture: ComponentFixture<WorkflowsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
