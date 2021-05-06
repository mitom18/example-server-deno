import appConfig from "../../config.ts";
import { Drash, djwt } from "../../deps.ts";

export async function jwtMiddleware(
    request: Drash.Http.Request,
    response: Drash.Http.Response
) {
    if (
        Drash.Members.ExcludedMiddleware &&
        Array.isArray(Drash.Members.ExcludedMiddleware) &&
        Drash.Members.ExcludedMiddleware.includes(jwtMiddleware)
    ) {
        return;
    }

    const token = request.getHeaderParam("Authorization");

    if (
        !token ||
        token.search(/bearer\s/i) === -1 ||
        token.split(/\s/).length < 2
    ) {
        throw new Drash.Exceptions.HttpMiddlewareException(
            401,
            "Not authenticated"
        );
    }

    try {
        const { exp } = await djwt.verify(
            token.split(/\s/)[1],
            appConfig.JWT_TOKEN_SECRET,
            appConfig.JWT_ALG
        );

        if (exp === undefined || Date.now() >= exp) {
            throw new Error();
        }
    } catch (error) {
        throw new Drash.Exceptions.HttpMiddlewareException(
            401,
            "Not authenticated"
        );
    }
}
