// Table
export interface TableComponentProps {
  columns: TableColumnsProps[];
  extraColumns?: TableExtraColumnsProps;
  extraConfig?: TableExtraConfigProps;
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
  show?: boolean;
  renderHeader?: (h: any, params: any) => any;
  render?: (h: any, params: any) => any;
}
export interface TableExtraColumnsProps {
  index?: boolean;
  selection?: boolean;
  indexLabel?: string;
  selectionLabel?: string;
}
export interface TableExtraConfigProps {
  rowKey?: string;
  treeProps?: { children: string; hasChildren: string };
  expand?: boolean;
  lazy?: boolean;
  load?: (row: any, treeNode: unknown, resolve: (data: any[]) => void) => void;
}

// Handle
export interface HandleComponentProps {
  show?: boolean;
  leftButtons?: HandleLeftProps[];
  columns?: TableColumnsProps[];
}
export interface HandleLeftProps {
  label: string;
  key: string;
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
