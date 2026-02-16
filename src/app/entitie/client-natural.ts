import { Gener } from "./gener";
import { Person } from "./person";
import { SocuialStatus } from "./status-social";

export class ClientNatural{
    person!: Person;
    firstName!: string;
    middleName!: string;
    thirdName!: string;
    lastName!: string;
    seccondLastName!: string;
    marriedLastName!: string;
    gener!: Gener;
    statusSocial!: SocuialStatus;

}