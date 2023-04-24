interface ImportMetaEnv {
  readonly VITE_REACT_APP_SERVER_API_DEV: string;
  readonly VITE_REACT_APP_BASE_URL_SERVER: string;
  readonly VITE_REACT_APP_ACCESS_TOKEN_MAXAGE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
