// src/config/helpers.ts

// src/config/helpers.ts

import imageConfig from "./images";

export const getImageUrl = (category: string, key: string): string => {
    const imagePath = (imageConfig as any)?.[category]?.[key];
    if (!imagePath) {
        // console.error(`Image not found for category: ${category}, key: ${key}`);
        return imageConfig.placeholders.default;
    }
    return imageConfig.generateUrl(imagePath);
};

// export const getPlaceholder = (type: "avatar" | "default"): string => {
//     return imageConfig.placeholders[type] || imageConfig.placeholders.default;
// };




import config from "./index";

export const getConfigValue = (key: string, defaultValue?: any): any => {
    const keys = key.split(".");
    let value = config as any;

    for (const k of keys) {
        if (value[k] === undefined) {
            return defaultValue;
        }
        value = value[k];
    }
    return value;
};

export const isFeatureEnabled = (feature: string): boolean => {
    return Boolean(getConfigValue(`env.featureFlags.${feature}`, false));
};


