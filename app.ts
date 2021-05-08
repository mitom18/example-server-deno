import { server } from "./server.ts";
import appConfig from "./config.ts";

server.run({
    hostname: "127.0.0.1", // NOTE must be 127.0.0.1 and not localhost in order to be accessible from autocannon
    port: appConfig.PORT,
});

console.info(`Server running on http://${server.hostname}:${server.port}`);
