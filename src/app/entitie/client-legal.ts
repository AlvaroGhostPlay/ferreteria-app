import { DocumentType } from "./document-type";
import { Person } from "./person";

export class ClientLegal{
    person!: Person;
    legalName!: string;
    comercialName!: string;
    documentType!: DocumentType;
    documentRepresentative!: string;
}