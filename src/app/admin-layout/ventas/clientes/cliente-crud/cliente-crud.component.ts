import { Component } from '@angular/core';
import { SharingDataServiceService } from '../../../../services/sharing-data-service.service';
import { NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import { PersonService } from '../../../../services/person.service';
import { Client } from '../../../../entitie/client';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PersonType } from '../../../../entitie/person-type';
import { CatalogService } from '../../../../services/catalog.service';
import { Gener } from '../../../../entitie/gener';
import { PersonCudDTO } from '../../../../dto/client-request';
import { SocuialStatus } from '../../../../entitie/status-social';
import { DocumentType } from '../../../../entitie/document-type';
import { InfoClientsCrudComponent } from '../info-clients-crud/info-clients-crud.component';
  
type Mode = 'create' | 'edit'   | 'view';

@Component({
  selector: 'cliente-crud',
  imports: [FormsModule, InfoClientsCrudComponent],
  templateUrl: './cliente-crud.component.html'
})
export class ClienteCrudComponent {
  get isEdit(): boolean {
  return (this.id ?? '').trim().length > 0;
}

hasValue(v: unknown): boolean {
  return v !== null && v !== undefined && String(v).trim().length > 0;
}

  id: string = ''; 
  mode: Mode = 'create';
  personTypes: PersonType[] = [];
  geners: Gener[] = [];
  statusSocials: SocuialStatus[] = [];
  documentTypes: DocumentType[] = [];
  types: boolean[] = [true, false];

  selectedPersonTypeId: string = '';
  socialStatusSelected: string = '';
  generSelected: string = '';
  documentTypeSelected: string = '';
  enabled: boolean = false;

  clientRequest!: PersonCudDTO;

client: Client = {
  person: {
    phones: [] as any,
    documentPerson: '',
    documentType: {
      documentType: '',
      documentTypeId: ''
    },
    email: '',
    enabled: false,
    name: '',
    person: {
      personType: '',
      personTypeId: ''
    },
    personId: ''
  },
  personLegal: {
    person: null as any,
    legalName: '',
    comercialName: '',
    documentType: {
      documentType: '',
      documentTypeId: ''
    },
    documentRepresentative: ''
  },
  personNatural: {
    person: null as any,
    firstName: '',
    middleName: '',
    thirdName: '',
    lastName: '',
    seccondLastName: '',
    marriedLastName: '',
    gener: {
      gener: '',
      generId: ''
    },               
    statusSocial: {  
      socialStatus: '',
      socialStatusId: ''
    }
  }
};

  private destroy$ = new Subject<void>();

  constructor(
    private sharingDataService: SharingDataServiceService,
    private router: Router,
    private personService: PersonService,
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    this.clientRequest = new PersonCudDTO();
    this.sharingDataService.editClientInfoId$
      .pipe(
        takeUntil(this.destroy$),
         filter(state => !!state && (state.id ?? '').trim().length > 0 || state.mode === 'create')
      )
      .subscribe(({ id, mode }) => {
        this.id = id;
        this.mode = mode;

        if (this.mode === 'create') {
      // ✅ limpiar form para crear
      this.resetForm();
      return;
    }


        this.personService.getClient(id).subscribe({
          next: (c) => {
            this.client = c;
            console.log(this.client);

            this.selectedPersonTypeId = String(this.client.person.person.personTypeId ?? '');
            this.socialStatusSelected = String(this.client.personNatural.statusSocial.socialStatusId ?? '');
            this.generSelected = String(this.client.personNatural.gener.generId ?? '');
            this.documentTypeSelected = String(this.client.person.documentType.documentTypeId ?? '');
            this.enabled = this.client.person.enabled;
            console.log(this.generSelected)
            if (this.id === '') {
              this.selectedPersonTypeId = ''; // muestra "Seleccione opción"
              this.client.person.person.personTypeId = '';

              this.socialStatusSelected = ''; // muestra "Seleccione opción"
              this.client.personNatural.statusSocial.socialStatusId = '';

              this.generSelected = ''; // muestra "Seleccione opción"
              this.client.personNatural.gener.generId = '';

              this.documentTypeSelected = ''; // muestra "Seleccione opción"
              this.client.person.documentType.documentTypeId = '';
              this.enabled = false; // valor por defecto para el checkbox
              this.client.person.enabled = false; // valor por defecto para el campo enabled 
              this.saveState(); 
            }
          },
          error: console.log
        });
      });

      this.catalogService.getDocumentType().subscribe({
        next: (data) => this.documentTypes = data,
        error: console.log
      });

      this.catalogService.getPersonType().subscribe({
        next: (data) => this.personTypes = data,
        error: console.log
      });

      this.catalogService.getGener().subscribe({
        next: (data) => {this.geners = data; console.log('Geners:', this.geners);},
        error: console.log
      });

      this.catalogService.getStatusSocialType().subscribe({
        next: (data) => {this.statusSocials = data; console.log('Status Socials:', this.statusSocials);},
        error: console.log
      });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart)
      )
      .subscribe(e => {
        // si estamos en /edit y vamos a otra ruta => limpiar
        if (this.router.url.includes('/auth/ventas/clientes/edit')) {
          // Si el destino NO es edit ni create, limpiamos
          if (!e.url.includes('/auth/ventas/clientes/edit')) {
            this.sharingDataService.clearEditClientId();
          }
        }
      });
  }

  save() {
    this.createClientRequest();
    this.personService.saveClient(this.clientRequest, this.client.person.personId).subscribe({
      next: (res) => {
      this.client = res;
      this.id = this.client.person.personId;
      if (this.mode === 'create') {
        // no cambies a edit
      }
      this.saveState();
      this.client = res;
      this.id = res.person.personId;
      this.sharingDataService.emitUpdateClientInfo({id: this.id, mode: this.mode});
      if (this.mode === 'create') {
        this.router.navigate(['/auth/ventas/clientes/address/create'])
      }
      if (this.mode === 'edit') {
        this.router.navigate(['/auth/ventas/clientes/address/edit'])
      }
      },
      error: (err) => console.log('Error al guardar cliente:', err)
    });
  }

  // cuando cancelas
  cancel() {
    this.sharingDataService.clearEditClientId();
    this.router.navigate(['/auth/ventas/clientes']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPersonTypeChange(id: string) {
  this.selectedPersonTypeId = id;
  this.client.person.person.personTypeId = id; // lo dejas listo para el request
  console.log('Selected Person Type ID:', id);
  }

  onSocialStatusChange(id: string) {
  this.socialStatusSelected = id;
  this.client.personNatural.statusSocial.socialStatusId = id; // lo dejas listo para el request
  console.log('Selected Social Status ID:', id);
  }

  onGenerChange(id: string) {
  this.generSelected = id;
  this.client.personNatural.gener.generId = id; // lo dejas listo para el request
  console.log('Selected Gener ID:', id);
  }

  onDocumentTypeChange(id: string) {
  this.documentTypeSelected = id;
  this.client.person.documentType.documentTypeId = id; // lo dejas listo para el request
  console.log('Selected Document Type ID:', id);
  }

  onEnabledChange(value: boolean) {
  this.enabled = value;
  this.client.person.enabled = value; // lo dejas listo para el request
  console.log('Enabled value:', value);
  }

  private saveState() {
  const state = {
    mode: this.mode,
    personId: this.client?.person?.personId ?? ''
  };
}

  createClientRequest(): void {
    this.clientRequest.kind = this.client.person.person.personTypeId === 'N' ? 'NATURAL' : 'LEGAL';
    this.clientRequest.idPersonType = this.client.person.person.personTypeId;
    this.clientRequest.client = true;
    this.clientRequest.supplier = false;
    this.clientRequest.employee = false;
    this.clientRequest.enabled = this.client.person.enabled;
    this.clientRequest.email = this.client.person.email;
    this.clientRequest.idDocumentType = this.client.person.documentType.documentTypeId;
    this.clientRequest.documentType = this.client.person.documentPerson;


    if(this.clientRequest.kind === 'NATURAL') {
      this.clientRequest.name = this.client.personNatural.firstName + ' ' + this.client.personNatural.middleName + ' ' + (this.client.personNatural.thirdName + ' ').trim() + this.client.personNatural.lastName + ' ' + this.client.personNatural.seccondLastName + ' ' + this.client.personNatural.marriedLastName;
      this.clientRequest.personNaturalData = {
        firstName: this.client.personNatural.firstName,
        lastName: this.client.personNatural.lastName,
        idGener: this.client.personNatural.gener.generId,
        middleName: this.client.personNatural.middleName,
        secondLastName: this.client.personNatural.seccondLastName,
        idSocialStatus: this.client.personNatural.statusSocial.socialStatusId,
        thirdName: this.client.personNatural.thirdName,
        marriedLastName: this.client.personNatural.marriedLastName
      };
      this.clientRequest.personLegalData = undefined;
    }else{
      this.clientRequest.name = this.client.personLegal.legalName;
      this.clientRequest.personLegalData = {
        legalName: this.client.personLegal.legalName,
        comercialName: this.client.personLegal.comercialName,
        idDocumentTypeRepresentative: this.client.personLegal.documentType.documentTypeId,
        representativeLegalDocument: this.client.personLegal.documentRepresentative
      };
      this.clientRequest.personNaturalData = undefined;
    }
  }

  private resetForm() {
  this.id = '';
  this.client = {
    person: {
      phones: [] as any,
      documentPerson: '',
      documentType: { documentType: '', documentTypeId: '' },
      email: '',
      enabled: false,
      name: '',
      person: { personType: '', personTypeId: '' },
      personId: ''
    },
    personLegal: {
      person: null as any,
      legalName: '',
      comercialName: '',
      documentType: { documentType: '', documentTypeId: '' },
      documentRepresentative: ''
    },
    personNatural: {
      person: null as any,
      firstName: '',
      middleName: '',
      thirdName: '',
      lastName: '',
      seccondLastName: '',
      marriedLastName: '',
      gener: { gener: '', generId: '' },
      statusSocial: { socialStatus: '', socialStatusId: '' }
    }
  };

  this.selectedPersonTypeId = '';
  this.socialStatusSelected = '';
  this.generSelected = '';
  this.documentTypeSelected = '';
  this.enabled = false;
}

private syncSelectionsFromClient() {
  this.selectedPersonTypeId = String(this.client.person.person.personTypeId ?? '');
  this.socialStatusSelected = String(this.client.personNatural.statusSocial.socialStatusId ?? '');
  this.generSelected = String(this.client.personNatural.gener.generId ?? '');
  this.documentTypeSelected = String(this.client.person.documentType.documentTypeId ?? '');
  this.enabled = !!this.client.person.enabled;
}
  
}
