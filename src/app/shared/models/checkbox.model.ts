export interface CheckBox {
  name: string;
  value: string | number;
  isChecked: boolean;
}

export interface CheckBoxGroup {
  name: string;
  value: string;
  isChecked: boolean;
  checkboxes: CheckBox[];
}