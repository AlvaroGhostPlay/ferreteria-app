import { DocumentType } from "./document-type";
import { PersonType } from "./person-type"
import { Phone } from "./phone";

export class Person{
    documentPerson!: string;
    documentType!: DocumentType;
    email!: string;
    enabled!: boolean;
    name!: string;
    person!: PersonType;
    personId!: string;
    phones!: Phone[];
}