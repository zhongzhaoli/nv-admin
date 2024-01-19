type FormType = 'input' | 'select' | 'date' | 'daterange';

export interface FilterColumnsProp {
  label: string;
  prop: string;
  type?: FormType;
  placeholder?: string;
  selectOptions?: { label: string; value: string }[];
}
