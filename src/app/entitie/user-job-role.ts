import { JobRoleDto } from "./job-role";
import { User } from "./user";

export class UserJobRole{
    user!: User;
    jobRole!:JobRoleDto[];
}