import { Drash, djwt, z } from "../../deps.ts";
import appConfig from "../../config.ts";
import { createUserService } from "../services/mod.ts";
import { userRepository } from "../repositories/mod.ts";

const userService = createUserService(userRepository);

export class SessionResource extends Drash.Http.Resource {
    static paths = ["/sessions"];

    public async POST() {
        const email = z.string().parse(this.request.getBodyParam("email"));
        const password = z
            .string()
            .parse(this.request.getBodyParam("password"));
        const credentialsOk = await userService.checkCredentials(
            email,
            password
        );
        if (!credentialsOk) {
            throw new Drash.Exceptions.HttpException(401, "Bad credentials");
        }
        const user = await userService.getByEmail(email);
        const exp = Date.now() + appConfig.JWT_ACCESS_TOKEN_EXP;
        const jwt = await djwt.create(
            { alg: appConfig.JWT_ALG, typ: "JWT" },
            { exp, user },
            appConfig.JWT_TOKEN_SECRET
        );

        this.response.body = { jwt };
        return this.response;
    }

    public async OPTIONS() {
        this.response.status_code = 204;
        return this.response;
    }
}
