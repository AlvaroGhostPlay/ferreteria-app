import { Role } from "./role";

export class User{
    userId!: string;
    username!: string;
    createdAt!: Date;
    passUpdateAt!: Date;
    mostChangePass!: boolean;
    enabled!: boolean;
    roles!: Role[]
}