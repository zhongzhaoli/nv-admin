// Table
export interface TableComponentProps {
  columns: TableColumnsProps[];
  extraColumns?: TableExtraColumnsProps;
  data?: any[];
}
export interface TableColumnsProps {
  prop: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  showOverflowTooltip?: boolean;
  fixed?: 'left' | 'right';
  minWidth?: string;
  slot?: boolean;
  renderHeader?: (h: any, params: any) => any;
  render?: (h: any, params: any) => any;
}
export interface TableExtraColumnsProps {
  index?: boolean;
  selection?: boolean;
  indexLabel?: string;
  selectionLabel?: string;
}

// Handle
export interface HandleComponentProps {
  leftButtons?: HandleLeftProps[];
}
export interface HandleLeftProps {
  label: string;
  type?: string;
  reIcon?: string;
  click?: () => any;
}

// Page
export interface PageComponentProps {
  total: number;
  pageSize: number;
  currentPage: number;
  layout?: string;
}
