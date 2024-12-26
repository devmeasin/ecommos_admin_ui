// src/config/thirdParty.ts

const thirdPartyConfig = {
    google: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
        enabled: Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    },
    sentry: {
        dsn: import.meta.env.VITE_SENTRY_DSN || "",
        environment: import.meta.env.MODE || "development", // Vite's built-in `MODE`
    },
};

export default thirdPartyConfig;
