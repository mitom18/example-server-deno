import { Drash } from "./deps.ts";
import { userRepository } from "./src/repositories/mod.ts";
import { createUserService } from "./src/services/mod.ts";
import {
    createUserResource,
    SessionResource,
    SessionCurrentResource,
} from "./src/resources/mod.ts";
import response from "./src/utils/response.ts";
import { appLogger } from "./src/utils/logger.ts";

// initialize services
const UserService = createUserService(userRepository);

// create resources with dependencies
const UserResource = createUserResource(UserService);

Drash.Http.Response = response;
export const server = new Drash.Http.Server({
    response_output: "application/json",
    resources: [UserResource, SessionResource, SessionCurrentResource],
    logger: appLogger,
});
