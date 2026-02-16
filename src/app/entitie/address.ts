import { AddressType } from "./address-type";
export class Address{
    addressId!: string;
    idPerson!: string;
    idAddressType!: AddressType;
    isPrimary!: boolean;
    line1!: string;
    line2!: string;
    city!: string;
    state!: string;
    country!: string;
    postalCode!: string;
    reference!: string;
    enabled!: boolean;
}