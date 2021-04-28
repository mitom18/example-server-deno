import { server } from "./server.ts";
import appConfig from "./config.ts";

server.run({
    hostname: "localhost",
    port: appConfig.PORT,
});

console.info(`Server running on ${server.hostname}:${server.port}`);
