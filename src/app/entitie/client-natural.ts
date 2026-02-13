import { Gener } from "./gener";
import { Person } from "./person";
import { SocuialStatus } from "./status-social";

export class ClientNatural{
    person!: Person;
    firstName!: string;
    middleName!: string;
    thirdName!: string;
    lastName!: string;
    secondLastName!: string;
    marriedLastName!: string;
    gener!: Gener;
    socialStatus!: SocuialStatus;

}