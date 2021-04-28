import { Model, Column, Primary, DataType } from "../../deps.ts";

export enum UserRole {
    ADMINISTRATOR = "administrator",
    USER = "user",
}

@Model("users")
export class User {
    @Primary()
    id?: number;

    @Column({ type: DataType.String })
    email!: string;

    @Column({ type: DataType.String })
    password!: string;

    @Column({ type: DataType.String })
    phone!: string;

    @Column({ type: DataType.String })
    role!: UserRole;
}
