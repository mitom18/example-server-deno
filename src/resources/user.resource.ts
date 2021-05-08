import { Drash, z } from "../../deps.ts";
import { UserService } from "../services/mod.ts";
import { User, UserRole } from "../model/mod.ts";
import { AdminBaseResource } from "./mod.ts";
import { jwtMiddleware } from "../middleware/mod.ts";

@Drash.Http.Middleware({
    before_request: [jwtMiddleware],
})
export class UserResource extends AdminBaseResource {
    static paths = ["/users/:id?"];

    static userService: UserService;

    public async GET() {
        const user = await this.getUserFromDb();
        if (user !== null) {
            this.response.body = user;
        } else {
            this.response.body = await UserResource.userService.getAll();
        }

        return this.response;
    }

    public async POST() {
        const user = await this.getUserFromBody();
        const createdUser = await UserResource.userService.add(user);

        this.response.status_code = 201;
        this.response.body = createdUser;
        return this.response;
    }

    public async PUT() {
        const oldUser = await this.getUserFromDb();
        if (oldUser === null) {
            throw new Drash.Exceptions.HttpException(
                400,
                "This resource requires the `:id` path param"
            );
        }
        const user = await this.getUserFromBody();
        await UserResource.userService.edit(oldUser.id!, user);
        this.response.status_code = 204;
        return this.response;
    }

    private async getUserFromDb(): Promise<User | null> {
        const userId = this.request.getPathParam("id");
        if (userId === null) {
            return null;
        }
        const userIdInt = parseInt(userId);

        if (isNaN(userIdInt)) {
            throw new Drash.Exceptions.HttpException(
                400,
                "This resource requires the `:id` path param to be a number."
            );
        }

        const user = await UserResource.userService.getById(userIdInt);

        if (user === null) {
            throw new Drash.Exceptions.HttpException(404, "User not found.");
        }

        return user;
    }

    private async getUserFromBody(): Promise<User> {
        const userSchema = z.object({
            id: z.number().optional(),
            email: z.string().email(),
            password: z.string(),
            phone: z.string(),
            role: z.nativeEnum(UserRole),
        });
        try {
            return userSchema.parse(this.request.parsed_body.data);
        } catch (error) {
            throw new Drash.Exceptions.HttpException(
                400,
                "This resource requires user object in the body."
            );
        }
    }
}

export const createUserResource = (userService: UserService) => {
    UserResource.userService = userService;
    return UserResource;
};
