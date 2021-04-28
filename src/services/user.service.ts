import { UserRepository } from "../repositories/mod.ts";
import { User } from "../model/mod.ts";
import { bcrypt } from "../../deps.ts";
import type { DeepPartial } from "../../deps.ts";

export class UserService {
    constructor(public userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async add(user: User): Promise<User> {
        const dbUser = new User();
        dbUser.email = user.email;
        dbUser.password = await bcrypt.hash(user.password);
        dbUser.phone = user.phone;
        dbUser.role = user.role;
        return (await this.userRepository.save(dbUser)) as User;
    }

    async edit(id: number, partialUser: DeepPartial<User>): Promise<void> {
        if (partialUser.password !== undefined) {
            partialUser.password = await bcrypt.hash(partialUser.password);
        }
        return await this.userRepository.edit(id, partialUser);
    }

    async getById(id: number): Promise<User | null> {
        return await this.userRepository.get(id);
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }
}

export const createUserService = (
    userRepository: UserRepository
): UserService => new UserService(userRepository);
