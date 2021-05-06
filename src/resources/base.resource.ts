import appConfig from "../../config.ts";
import { djwt, Drash } from "../../deps.ts";
import { User } from "../model/mod.ts";

export class AdminBaseResource extends Drash.Http.Resource {
    protected currentUser: User | null = null;

    /**
     * Gets user entity from JWT in Authorization header, if set.
     * @returns User
     */
    protected async getCurrentUser(): Promise<User | null> {
        console.log("Getting the current user.");
        if (this.currentUser) {
            console.log(`Using cached User #${this.currentUser.id}.`);
            return this.currentUser;
        }

        try {
            const token = this.request.getHeaderParam("Authorization");

            if (!token) {
                throw new Error();
            }

            this.currentUser = (
                await djwt.verify(
                    token.split(/\s/)[1],
                    appConfig.JWT_TOKEN_SECRET,
                    appConfig.JWT_ALG
                )
            ).user as User;

            console.log(
                `Setting User #${this.currentUser.id} as current user.`
            );
            return this.currentUser;
        } catch (error) {
            throw new Drash.Exceptions.HttpMiddlewareException(
                401,
                "Not authenticated"
            );
        }
    }
}
