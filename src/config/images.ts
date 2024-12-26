// src/config/images.ts


const imageConfig = {
   
    logos: {
        dark: "/assets/images/logos/logo-dark.png",
        light: "/assets/images/logos/logo-light.jpg",
    },
    banners: {
        home: "/assets/images/banners/home-banner.jpg",
        product: "/assets/images/banners/product-banner.jpg",
    },
    auth: {
        shield: "/assets/images/auth/login-security.svg",
    },
    cdnBaseUrl: import.meta.env.VITE_IMAGE_CDN_URL || "",
    generateUrl: (path: string) => {
        return imageConfig.cdnBaseUrl ? `${imageConfig.cdnBaseUrl}${path}` : path;
    },
};

export default imageConfig;
