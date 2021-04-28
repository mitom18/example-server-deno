import { Drash } from "../../deps.ts";
import appConfig from "../../config.ts";

export const appLogger = new Drash.CoreLoggers.FileLogger({
    enabled: true,
    level: appConfig.LOG_LEVEL,
});
