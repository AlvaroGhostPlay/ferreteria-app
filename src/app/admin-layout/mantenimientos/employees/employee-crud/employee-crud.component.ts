import { Component } from '@angular/core';
import { SharingDataServiceService, Mode, PersonKind, CrudState } from '../../../../services/sharing-data-service.service';
import { NavigationStart, Router } from '@angular/router';
import { PersonService } from '../../../../services/person.service';
import { Client } from '../../../../entitie/client';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PersonType } from '../../../../entitie/person-type';
import { CatalogService } from '../../../../services/catalog.service';
import { Gener } from '../../../../entitie/gener';
import { PersonCudDTO } from '../../../../dto/client-request';
import { SocuialStatus } from '../../../../entitie/status-social';
import { DocumentType } from '../../../../entitie/document-type';
import { InfoClientsCrudComponent } from '../../../ventas/clientes/info-clients-crud/info-clients-crud.component';

@Component({
  selector: 'app-employee-crud',
  imports: [FormsModule, InfoClientsCrudComponent],
  templateUrl: './employee-crud.component.html'
})
export class EmployeeCrudComponent {

  // ===== helpers =====
  get isEdit(): boolean {
    return (this.id ?? '').trim().length > 0;
  }

  hasValue(v: unknown): boolean {
    return v !== null && v !== undefined && String(v).trim().length > 0;
  }

  // ===== state =====
  id: string = '';
  mode: Mode = 'create';
  kind: PersonKind = 'clientes';

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

  private destroy$ = new Subject<void>();

  constructor(
    private sharingDataService: SharingDataServiceService,
    private router: Router,
    private personService: PersonService,
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    this.clientRequest = new PersonCudDTO();

    // ✅ 1) Escuchar el estado genérico (id + mode + kind)
    this.sharingDataService.personCrud$
      .pipe(
        takeUntil(this.destroy$),
        filter((state: CrudState) => !!state && (state.mode === 'create' || (state.id ?? '').trim().length > 0))
      )
      .subscribe((state: CrudState) => {
        this.id = state.id;
        this.mode = state.mode;
        this.kind = state.kind;

        // create => limpiar formulario
        if (this.mode === 'create') {
          this.resetForm();
          return;
        }

        // edit/view => traer data
        this.personService.getClient(this.id).subscribe({
          next: (c) => {
            this.client = c;

            this.selectedPersonTypeId = String(this.client.person.person.personTypeId ?? '');
            this.socialStatusSelected = String(this.client.personNatural.statusSocial.socialStatusId ?? '');
            this.generSelected = String(this.client.personNatural.gener.generId ?? '');
            this.documentTypeSelected = String(this.client.person.documentType.documentTypeId ?? '');
            this.enabled = !!this.client.person.enabled;
          },
          error: console.log
        });
      });

    // ✅ 2) catálogos
    this.catalogService.getDocumentType().subscribe({
      next: (data) => this.documentTypes = data,
      error: console.log
    });

    this.catalogService.getPersonType().subscribe({
      next: (data) => this.personTypes = data,
      error: console.log
    });

    this.catalogService.getGener().subscribe({
      next: (data) => this.geners = data,
      error: console.log
    });

    this.catalogService.getStatusSocialType().subscribe({
      next: (data) => this.statusSocials = data,
      error: console.log
    });

    // ✅ 3) limpiar state al salir del módulo mantenimientos
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart)
      )
      .subscribe(e => {
        const stayIn = e.url.startsWith(`/auth/mantenimientos/${this.kind}`);
        if (!stayIn) {
          this.sharingDataService.clearPersonCrud();
        }
      });
  }

  // =========================================================
  // SAVE
  // =========================================================
  save() {
    this.createPersonRequest();

    // 👇 IMPORTANTE: usa el mismo método del service
    this.personService.saveClient(this.clientRequest, this.client.person.personId).subscribe({
      next: (res) => {
        this.client = res;
        this.id = res.person.personId;

        // mantener el estado (no lo cambies si querés)
        this.sharingDataService.emitPersonCrud({ id: this.id, mode: this.mode, kind: this.kind });

        // navegar a address según modo + kind
        if (this.mode === 'create') {
          this.router.navigate([`/auth/mantenimientos/${this.kind}/address/create`]);
        } else if (this.mode === 'edit') {
          this.router.navigate([`/auth/mantenimientos/${this.kind}/address/edit`]);
        } else {
          // view no debería guardar, pero por si acaso:
          this.router.navigate([`/auth/mantenimientos/${this.kind}`]);
        }
      },
      error: (err) => console.log('Error al guardar persona:', err)
    });
  }

  cancel() {
    this.sharingDataService.clearPersonCrud();
    this.router.navigate([`/auth/mantenimientos/${this.kind}`]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // =========================================================
  // SELECTS
  // =========================================================
  onPersonTypeChange(id: string) {
    this.selectedPersonTypeId = id;
    this.client.person.person.personTypeId = id;
  }

  onSocialStatusChange(id: string) {
    this.socialStatusSelected = id;
    this.client.personNatural.statusSocial.socialStatusId = id;
  }

  onGenerChange(id: string) {
    this.generSelected = id;
    this.client.personNatural.gener.generId = id;
  }

  onDocumentTypeChange(id: string) {
    this.documentTypeSelected = id;
    this.client.person.documentType.documentTypeId = id;
  }

  onEnabledChange(value: boolean) {
    this.enabled = value;
    this.client.person.enabled = value;
  }

  // =========================================================
  // REQUEST (GENÉRICO)
  // =========================================================
  private createPersonRequest(): void {
    // kind NATURAL/LEGAL por el tipo
    const personTypeId = this.client.person.person.personTypeId;
    this.clientRequest.kind = (personTypeId === 'N') ? 'NATURAL' : 'LEGAL';
    this.clientRequest.idPersonType = personTypeId;

    // ✅ flags según kind
    this.clientRequest.client = (this.kind === 'clientes');
    this.clientRequest.employee = (this.kind === 'empleados');
    this.clientRequest.supplier = (this.kind === 'proveedores');

    this.clientRequest.enabled = this.client.person.enabled;
    this.clientRequest.email = this.client.person.email;
    this.clientRequest.idDocumentType = this.client.person.documentType.documentTypeId;
    this.clientRequest.documentType = this.client.person.documentPerson;

    if (this.clientRequest.kind === 'NATURAL') {
      const t3 = (this.client.personNatural.thirdName ?? '').trim();
      const casada = (this.client.personNatural.marriedLastName ?? '').trim();

      this.clientRequest.name =
        `${this.client.personNatural.firstName} ${this.client.personNatural.middleName} ${t3 ? t3 + ' ' : ''}${this.client.personNatural.lastName} ${this.client.personNatural.seccondLastName} ${casada}`.trim();

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
    } else {
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

  // =========================================================
  // RESET
  // =========================================================
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
}

