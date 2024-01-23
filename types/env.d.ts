/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_COMPANY_NAME: string;
  readonly VITE_ROUTER_HISTORY: 'hash' | 'history';
  readonly VITE_PUBLIC_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
