/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_REACT_APP_NODE_ENV: string;
  readonly VITE_PUBLIC_URL: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}