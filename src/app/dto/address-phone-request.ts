// address-phone-request.ts

export class AddressPhoneRequest {
  addresses: AddressRequest[] = [];
  phones: PhoneRequest[] = [];

  constructor(init?: Partial<AddressPhoneRequest>) {
    Object.assign(this, init);
  }
}

// ---- Address ----
export class AddressRequest {
  addressId?: string;        // UUID (opcional si es create)
  idPerson!: string;         // UUID
  idAddressType!: string;    // String (catálogo)
  primary!: boolean;

  line1!: string;
  line2?: string | null;

  city!: string;
  state!: string;
  country!: string;
  postalCode!: string;

  reference?: string | null;

  enabled!: boolean;

  constructor(init?: Partial<AddressRequest>) {
    Object.assign(this, init);
  }
}

// ---- Phone ----
export class PhoneRequest {
  phoneId?: string;          // UUID (opcional si es create)
  idPerson!: string;         // UUID
  idPhoneType!: string;      // String (catálogo)
  phoneNumber!: string;

  enabled!: boolean;

  constructor(init?: Partial<PhoneRequest>) {
    Object.assign(this, init);
  }
}
