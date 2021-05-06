import { Drash } from "../../deps.ts";
import { jwtMiddleware } from "../middleware/mod.ts";
import { AdminBaseResource } from "./mod.ts";

@Drash.Http.Middleware({
    before_request: [jwtMiddleware],
})
export class SessionCurrentResource extends AdminBaseResource {
    static paths = ["/sessions/current"];

    public async GET() {
        const user = await this.getCurrentUser();
        if (user) {
            this.response.body = {
                ...user,
                password: undefined,
            };
        }
        return this.response;
    }
}
