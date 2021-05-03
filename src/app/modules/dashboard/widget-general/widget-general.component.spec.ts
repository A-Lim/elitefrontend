import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetGeneralComponent } from './widget-general.component';

describe('WidgetGeneralComponent', () => {
  let component: WidgetGeneralComponent;
  let fixture: ComponentFixture<WidgetGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
