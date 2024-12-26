/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_DESCRIPTION: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_ENABLE_BETA_FEATURES: string;
    readonly VITE_LOG_LEVEL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
