import { loadConfig, djwtAlg } from "./deps.ts";

interface AppConfig {
    PORT: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    LOG_LEVEL: string;
    JWT_ACCESS_TOKEN_EXP: number;
    JWT_REFRESH_TOKEN_EXP: number;
    JWT_ALG: djwtAlg.Algorithm;
    JWT_TOKEN_SECRET: string;
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
    JWT_ACCESS_TOKEN_EXP: parseInt(rawConfig.JWT_ACCESS_TOKEN_EXP),
    JWT_REFRESH_TOKEN_EXP: parseInt(rawConfig.JWT_REFRESH_TOKEN_EXP),
    JWT_ALG: rawConfig.JWT_ALG as djwtAlg.Algorithm,
    JWT_TOKEN_SECRET: rawConfig.JWT_TOKEN_SECRET,
};

export default appConfig;
