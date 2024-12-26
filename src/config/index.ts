// src/config/index.ts

import appConfig from "./app";
import thirdPartyConfig from "./thirdParty";
import envConfig from "./env";

const config = {
    app: appConfig,
    thirdParty: thirdPartyConfig,
    env: envConfig,
};

export default config;
