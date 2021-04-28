import { loadConfig } from "./deps.ts";

interface AppConfig {
    PORT: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    LOG_LEVEL: string;
}

const rawConfig = loadConfig({
    safe: true,
    allowEmptyValues: true,
    export: true,
});

const appConfig: AppConfig = {
    PORT: parseInt(rawConfig.PORT),
    DB_HOST: rawConfig.DB_HOST,
    DB_NAME: rawConfig.DB_NAME,
    DB_USER: rawConfig.DB_USER,
    DB_PASSWORD: rawConfig.DB_PASSWORD,
    LOG_LEVEL: rawConfig.LOG_LEVEL,
};

export default appConfig;
