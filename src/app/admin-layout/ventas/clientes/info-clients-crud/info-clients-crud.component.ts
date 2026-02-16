import { Component, Input } from '@angular/core';
import { InfoPersonService} from '../../../../services/info-person.service';
import { CatalogService } from '../../../../services/catalog.service';
import { AddressType } from '../../../../entitie/address-type';
import { Address } from '../../../../entitie/address';
import { SharingDataServiceService } from '../../../../services/sharing-data-service.service'; 
import { PersonService } from '../../../../services/person.service'; 
import { Subject} from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { PersonName } from '../../../../dto/person-name';
import { FormsModule } from '@angular/forms';
import { Phones } from '../../../../entitie/phones';
import { PhoneType } from '../../../../entitie/phone-type';
import { AddressPhoneRequest } from '../../../../dto/address-phone-request';

type Mode = 'create' | 'edit'   | 'view';
@Component({
  selector: 'info-clients-crud',
  imports: [FormsModule],
  templateUrl: './info-clients-crud.component.html'
})
export class InfoClientsCrudComponent {

  status: number = 0;
  idClient: string = '';
  contPhone: number = 0;
  addressesTypes: AddressType[] = [];
  phoneTypes: PhoneType[] = [];
  personName: PersonName = new PersonName();
  addresses: Address[] = [];
  phones: Phones[] = [];
  private destroy$ = new Subject<void>();
  mode: Mode = 'create';
  cont: number = 0;
  availableTypes: AddressType[] = [];  
  availablePhoneTypes: PhoneType[] = [];  
  principalSelected: string = '';
  select: boolean[] = [true, false];
  primaryIndex: number | null = null;

  get isEdit(): boolean {
  return (this.idClient ?? '').trim().length > 0;
}

hasValue(v: unknown): boolean {
  return v !== null && v !== undefined && String(v).trim().length > 0;
}

  constructor(
    private infoPersonService: InfoPersonService,
    private catalogService: CatalogService,
    private sharingDataService: SharingDataServiceService,
    private router: Router,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.sharingDataService.editClientInfoId$
    .pipe(
            takeUntil(this.destroy$),
            filter(obj => !!obj && !!obj.id)
          )
    .subscribe((obj:any) => {
      this.idClient = obj.id;
      this.mode = obj.mode;
    });

    this.personService.getPersonName(this.idClient).subscribe({
      next: (res) => {
        this.personName = res;
        console.log(this.personName);
      }
    })

    console.log(this.idClient);
    this.infoPersonService.getAddressAndPhone(this.idClient).subscribe({
      next: (res) => {
        console.log(res);
        if(res.addresses.length === 0 && res.phones.length === 0){
          this.addAddress();
          this.addPhone();
        }
        console.log(res.addresses);
        console.log(this.addresses);
        this.phones = res.phones;
        this.addresses = res.addresses;
        this.cont = this.addresses.length;
        this.contPhone = this.phones.length;
      },
      error: (err) => {console.log(err)
      this.addAddress();
      this.addPhone();
    }
    })

    this.catalogService.getAddressType().subscribe({
      next: (res) => {
        this.addressesTypes = res;
        this.availableTypes = [...this.addressesTypes];
        console.log(this.addressesTypes);
      },
      error: (err) => console.log(err)
    })

    this.catalogService.getPhonesType().subscribe({
      next: (res) => {
        this.phoneTypes = res;
        this.availablePhoneTypes = [...this.phoneTypes];
        console.log(this.phoneTypes);
      },
      error: (err) => console.log(err)
    })

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart)
      )
      .subscribe(e => {
        // si estamos en /edit y vamos a otra ruta => limpiar
        if (this.router.url.includes('/auth/ventas/clientes/address/edit')) {
          // Si el destino NO es edit ni create, limpiamos
          if (!e.url.includes('/auth/ventas/clientes/address/edit')) {
            this.sharingDataService.clearEditClientId();
          }
        }
      });
  }

  addAddress() {
  this.addresses.push({
    addressId: '',
    idPerson: this.idClient,
    idAddressType: {
      addressTypeId: '',
      addressType: ''
    },
    isPrimary: false,
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    reference: '',
    enabled: true
  });
  this.cont++;
}

addPhone() {
  this.phones.push({
    phoneId: '',
    idPerson: this.idClient,
    type: {
      phoneTypeId: '',
      phoneType: ''
    },
    phoneNumber: '',
    enabled: true
  });
  this.contPhone++;
}

removeAddress(index: number) {
  const addr = this.addresses[index];
  const id = addr.idAddressType?.addressTypeId;

  // devolver tipo al pool
  if (id) {
    const type = this.addressesTypes.find(t => t.addressTypeId === id);
    if (type && !this.availableTypes.some(t => t.addressTypeId === id)) {
      this.availableTypes.push(type);
      this.sortAvailableTypes();
    }
  }

  // manejar principal
  const wasPrimary = addr.isPrimary;

  // ✅ solo una vez
  this.addresses.splice(index, 1);
  this.cont--;

  if (wasPrimary) {
    this.primaryIndex = null;
  } else if (this.primaryIndex !== null && index < this.primaryIndex) {
    this.primaryIndex--;
  }
}

removePhone(index: number) {
  const addr = this.phones[index];
  const id = addr.type.phoneTypeId;

  // devolver tipo al pool
  if (id) {
    const type = this.phoneTypes.find(t => t.phoneTypeId === id);
    if (type && !this.availablePhoneTypes.some(t => t.phoneTypeId === id)) {
      this.availablePhoneTypes.push(type);
      this.sortAvailablePhoneTypes();
    }
  }
    this.phones.splice(index, 1);
  this.contPhone--;
}

  onPrincipalSelected(id: string, index: number) {
  this.principalSelected = id;
  this.addresses[index].idAddressType.addressTypeId = id;
  console.log('Selected Address Type ID:', id);
  }

onAddressTypeSelected(newId: string, index: number) {
  const addr = this.addresses[index];

  const oldId = addr.idAddressType?.addressTypeId || '';

  // Si ya tenía uno seleccionado, primero lo devolvemos al pool
  if (oldId) {
    const oldType = this.addressesTypes.find(t => t.addressTypeId === oldId);
    if (oldType && !this.availableTypes.some(t => t.addressTypeId === oldId)) {
      this.availableTypes.push(oldType);
    }
  }
    // Asignamos el nuevo
  addr.idAddressType.addressTypeId = newId;

  // Quitamos el nuevo del pool
  this.availableTypes = this.availableTypes.filter(t => t.addressTypeId !== newId);

  // (Opcional) reordenar pool según el orden original del catálogo
  this.sortAvailableTypes();
}

onPhoneTypeSelected(newId: string, index: number) {
  const addr = this.phones[index];

  const oldId = addr.type.phoneTypeId || '';

  // Si ya tenía uno seleccionado, primero lo devolvemos al pool
  if (oldId) {
    const oldType = this.phoneTypes.find(t => t.phoneTypeId === oldId);
    if (oldType && !this.availablePhoneTypes.some(t => t.phoneTypeId === oldId)) {
      this.availablePhoneTypes.push(oldType);
    }
  }
    // Asignamos el nuevo
  addr.type.phoneTypeId = newId;

  // Quitamos el nuevo del pool
  this.availablePhoneTypes = this.availablePhoneTypes.filter(t => t.phoneTypeId !== newId);

  // (Opcional) reordenar pool según el orden original del catálogo
  this.sortAvailableTypes();
}

private sortAvailableTypes() {
  const order = new Map(this.addressesTypes.map((t, i) => [t.addressTypeId, i]));
  this.availableTypes.sort((a, b) => (order.get(a.addressTypeId) ?? 0) - (order.get(b.addressTypeId) ?? 0));
}

private sortAvailablePhoneTypes() {
  const order = new Map(this.phoneTypes.map((t, i) => [t.phoneTypeId, i]));
  this.availablePhoneTypes.sort((a, b) => (order.get(a.phoneTypeId) ?? 0) - (order.get(b.phoneTypeId) ?? 0));
}

getOptionsFor(addr: Address): AddressType[] {
  const selectedId = addr.idAddressType?.addressTypeId;

  // Si no hay selección aún, devolvemos el pool normal
  if (!selectedId) return this.availableTypes;

  const selectedType = this.addressesTypes.find(t => t.addressTypeId === selectedId);
  if (!selectedType) return this.availableTypes;

  // Mostramos: [seleccionado] + (pool sin duplicarlo)
  return [selectedType, ...this.availableTypes.filter(t => t.addressTypeId !== selectedId)];
}

getOptionsForPhone(addr: Phones): PhoneType[] {
  const selectedId = addr.type.phoneTypeId;

  // Si no hay selección aún, devolvemos el pool normal
  if (!selectedId) return this.availablePhoneTypes;

  const selectedType = this.phoneTypes.find(t => t.phoneTypeId === selectedId);
  if (!selectedType) return this.availablePhoneTypes;

  // Mostramos: [seleccionado] + (pool sin duplicarlo)
  return [selectedType, ...this.availablePhoneTypes.filter(t => t.phoneTypeId !== selectedId)];
}

setPrimary(index: number, checked: boolean) {
  if (checked) {
    // deja SOLO una en true
    this.addresses.forEach((a, i) => (a.isPrimary = i === index));
  } else {
    this.addresses[index].isPrimary = false;
  }
}

hasPrimary(): boolean {
  return this.addresses.some(a => a.isPrimary);
}

isOtherPrimary(i: number): boolean {
  return this.addresses.some((a, idx) => idx !== i && a.isPrimary);
}

save() {

  const request: AddressPhoneRequest = {
  addresses: this.addresses.map(a => ({
    addressId: a.addressId,
    idPerson: a.idPerson,
    idAddressType: a.idAddressType?.addressTypeId || '',
    primary: a.isPrimary,
    line1: a.line1,
    line2: a.line2,
    city: a.city,
    state: a.state,
    country: a.country,
    postalCode: a.postalCode,
    reference: a.reference,
    enabled: a.enabled,
  })
),
phones: this.phones.map(p => ({
  phoneId: p.phoneId,
  idPerson: p.idPerson,
  idPhoneType: p.type.phoneTypeId || '',
  phoneNumber: p.phoneNumber,
  enabled: p.enabled,
}))
}


  this.status = 200

    if(this.mode=='create'){ 
      this.infoPersonService.saveAddressAndPhone(request).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/auth/ventas/clientes']);
        },
        error: (err) => {console.log(err),this.status = err.status;}
      })
    } else{
      this.infoPersonService.updateAddressAndPhone(this.idClient, request).subscribe({
        next: (res) => {
          console.log(res); 
          this.router.navigate(['/auth/ventas/clientes']);
        },
        error: (err) => {console.log(err),
          console.log(err.status),
          this.status = err.status;
        }
      })
    }
}


}
