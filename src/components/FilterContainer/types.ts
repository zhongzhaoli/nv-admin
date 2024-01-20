type FormType = 'input' | 'select' | 'date';

export interface FilterColumnsProp {
  label: string;
  prop: string;
  type?: FormType;
  placeholder?: string;
  selectOptions?: FilterSelectOptionsProp[];
}

export interface FilterSelectOptionsProp {
  label: string;
  value: any;
}
