export type JobRole = 'ADMIN' | 'VENTAS' | 'CAJA' | 'SUPERVISOR';

export class JobRoleDto{
    jobRoleId!:string;
    jobRole!: string;
}