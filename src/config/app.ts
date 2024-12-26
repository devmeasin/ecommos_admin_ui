// src/config/app.ts

const appConfig = {
    name: import.meta.env.VITE_APP_NAME || "eCommOS",
    description: import.meta.env.VITE_APP_DESCRIPTION || "Multi Order Managing System",
    version: "1.0.0", // Hardcoded or use `import.meta.env` if available
    theme: {
        // primaryColor: "#215.45 100% 95.69%",
        // secondaryColor: "#6C757D",
    },
};

export default appConfig;
