import { User } from "../model/mod.ts";
import BaseRepository from "./base.repository.ts";

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }
}

export const userRepository = new UserRepository();
