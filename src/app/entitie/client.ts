import { ClientLegal } from "./client-legal";
import { ClientNatural } from "./client-natural";
import { Person } from "./person";

export class Client{
    person!: Person;
    personLegal!: ClientLegal;
    personNatural!: ClientNatural;
}