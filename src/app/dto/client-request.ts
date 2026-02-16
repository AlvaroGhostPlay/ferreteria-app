export type PersonKind = "NATURAL" | "LEGAL";

export class NaturalData {
  firstName!: string;
  lastName!: string;
  idGener!: string;
  middleName!: string;
  secondLastName!: string;
  idSocialStatus!: string;

  thirdName?: string;
  marriedLastName?: string;

  constructor(init?: Partial<NaturalData>) {
    Object.assign(this, init);
  }
}

export class LegalData {
  legalName!: string;
  comercialName!: string;
  idDocumentTypeRepresentative!: string;
  representativeLegalDocument!: string;

  constructor(init?: Partial<LegalData>) {
    Object.assign(this, init);
  }
}

export class PersonCudDTO {
  kind!: PersonKind;

  idPersonType!: string;

  client!: boolean;
  supplier: boolean = false;
  employee: boolean = false;

  enabled!: boolean;

  email!: string;

  idDocumentType!: string;
  documentType!: string;

  name!: string;

  personNaturalData?: NaturalData;
  personLegalData?: LegalData;

  constructor(init?: Partial<PersonCudDTO>) {
    Object.assign(this, init);

    // Si vienen como objetos planos, los "hidrata" a clases
    if (init?.personNaturalData && !(init.personNaturalData instanceof NaturalData)) {
      this.personNaturalData = new NaturalData(init.personNaturalData);
    }
    if (init?.personLegalData && !(init.personLegalData instanceof LegalData)) {
      this.personLegalData = new LegalData(init.personLegalData);
    }
  }
}