import { Component } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import {PaginatorComponent} from '../../paginator/paginator.component'
import { PersonKind, SharingDataServiceService } from '../../../services/sharing-data-service.service';
import { PersonService } from '../../../services/person.service';
import { Person } from '../../../entitie/person';

@Component({
  selector: 'app-employees',
  imports: [PaginatorComponent],
  templateUrl: './employees.component.html'
})
export class EmployeesComponent {

kind: PersonKind = 'clientes';

  paginator: any = { totalPages: 0, number: 0 };
  url: string = ''; // se arma en ngOnInit
  persons: Person[] = [];

  constructor(
    private sharing: SharingDataServiceService,
    private router: Router,
    private service: PersonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // kind viene de la ruta
    this.route.paramMap.subscribe(pm => {
      this.kind = (pm.get('kind') as PersonKind) ?? 'clientes';
      console.log(this.kind)
      const page = pm.get('page') ?? '0';

      this.url = `/auth/mantenimientos/${this.kind}/page`;

      this.service.getPersons(this.kind, page).subscribe({
        next: (res: any) => {
          this.persons = res.content;
          this.paginator = { totalPages: res.totalPages, number: res.number };
        },
        error: err => console.log(err)
      });
    });
  }

  title(): string {
    if (this.kind === 'empleados') return 'Mantenimiento de Empleados';
    if (this.kind === 'proveedores') return 'Mantenimiento de Proveedores';
    return 'Mantenimiento de Clientes';
  }

  create() {
    // ojo: en personas “create” normalmente no tiene id
    this.sharing.emitPersonCrud({ id: '', mode: 'create', kind: this.kind });
    this.router.navigate([`/auth/mantenimientos/${this.kind}/create`]);
  }

  view(id: string) {
    this.sharing.emitPersonCrud({ id, mode: 'view', kind: this.kind });
    this.router.navigate([`/auth/mantenimientos/${this.kind}/view`]);
  }

  update(id: string) {
    this.sharing.emitPersonCrud({ id, mode: 'edit', kind: this.kind });
    this.router.navigate([`/auth/mantenimientos/${this.kind}/edit`]);
  }

  deletePerson(id: string) {
    // opcional: optimista en UI
    this.persons = this.persons.filter(p => p.personId !== id);

    this.service.deletePerson(this.kind, id).subscribe({
      next: () => {},
      error: err => console.log(err)
    });
  }
}

