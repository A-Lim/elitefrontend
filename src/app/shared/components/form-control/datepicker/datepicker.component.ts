import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

@Component({
  selector: 'shared-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [     
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true     
    }   
  ]
})
export class DatepickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input()
  setDefaultToday: boolean;

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy',
    stylesData: {
      selector: 'dp',
      styles: `
        .dp .myDpSelector {
          width: 240px !important;
          height: 240px !important;
        }
        .dp .myDpDaycell {
          font-size: 12px;
        }
        .dp .myDpWeekDayTitle {
          font-size: 12px;
          font-weight: 600;
        }
        .dp .myDpMonthBtn, 
        .dp .myDpYearBtn {
          font-size: 14px;
        }
        .dp .myDpIconRightArrow:before {
          font-family: 'boxicons';
          content: '\\eb23'
        }
        .dp .myDpIconLeftArrow:before {
          font-family: 'boxicons';
          content: '\\eac9'
        }
        .db .myDpMonthYearSelBar {
          margin-bottom: 2px;
        }
      `
    },
    dayLabels: {
      su: 'S', 
      mo: 'M', 
      tu: 'T', 
      we: 'W', 
      th: 'T', 
      fr: 'F', 
      sa: 'S'
    }
    // other options are here...
  };

  onChanged = (value: string) => {};
  onTouched = () => {};

  disabled: boolean = false;
  model: IMyDateModel = null;

  constructor() { }

  ngOnInit() {
    if (this.setDefaultToday)
      this.model = { isRange: false, singleDate: { jsDate: new Date() }};
  }

  ngOnDestroy() {
  }

  writeValue(value: string) {
    if (value) {
      this.model = { isRange: false, singleDate: { jsDate: new Date(value) }};
    }
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel) {
    this.onTouched();
    this.onChanged(event.singleDate.jsDate.toISOString());
  }
}
