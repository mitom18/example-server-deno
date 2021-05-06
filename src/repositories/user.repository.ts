import { User } from "../model/mod.ts";
import BaseRepository from "./base.repository.ts";

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async getByEmail(email: string) {
        return await this.getQueryBuilder().where("email", email).first();
    }
}

export const userRepository = new UserRepository();
