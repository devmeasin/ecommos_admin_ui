// src/config/env.ts

const envConfig = {
    isProduction: import.meta.env.MODE === "production",
    featureFlags: {
        enableBetaFeatures: import.meta.env.VITE_ENABLE_BETA_FEATURES === "true",
    },
    logLevel: import.meta.env.VITE_LOG_LEVEL || "info",
};

export default envConfig;
