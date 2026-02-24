import { Component } from '@angular/core';
import { Mode, SharingDataServiceService } from '../../../../services/sharing-data-service.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../entitie/user';
import { NavigationStart, Router } from '@angular/router';
import { Role } from '../../../../entitie/role';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../../../services/person.service';
import { Person } from '../../../../entitie/person';

@Component({
  selector: 'app-employee-crud',
  imports: [FormsModule],
  templateUrl: './employee-crud.component.html'
})
export class EmployeeCrudComponent {

  hoy: Date = new Date();
  userId: string = '';
  mode: Mode = 'create';
  private destroy$ = new Subject<void>();

  types: boolean[] = [true, false]

  user: User = new User();
  person: Person = new Person();
  roles: Role[] = [];

  selectedRoleId: string = '';
  searchTerm = '';
  clients: Person[] = [];
  showDropdown = false;

  constructor(
    private sharingDataService: SharingDataServiceService,
    private userServie: UserService,
    private router: Router,
    private clientService: PersonService
  ) { }

  ngOnInit() {
    this.sharingDataService.userCrud$
      .subscribe((obj: any) => {
        this.userId = obj.id;
        this.mode = obj.mode;
        console.log(this.user.userId)


        this.userServie.getUser(this.userId).subscribe({
          next: user => {
            this.user = user;
            this.syncSelectedRoleFromUser();

            this.userServie.getRoles().subscribe({
              next: roles => {
                this.roles = roles;
                console.log(roles)
                this.syncSelectedRoleFromUser();
                if (this.userId === '') {
                  this.selectedRoleId = '';
                }
              }
            })
          },
          error: error => console.log(error)
        })
      });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart)
      )
      .subscribe(e => {
        const goingToUsers = e.url.startsWith('/auth/mantenimientos/usuarios');
        if (!goingToUsers) {
          this.sharingDataService.clearUserId();
        }
      });
  }

  cancel() {
    this.sharingDataService.clearUserId();
    this.router.navigate(['/auth/mantenimientos']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRoleSelected(id: string) {
    this.selectedRoleId = id;
    this.user.roles[0].roleId = id // lo dejas listo para el request
    console.log('Selected role Id:', id);
  }

  get isEdit(): boolean {
    return (this.userId ?? '').trim().length > 0;
  }

  hasValue(v: unknown): boolean {
    return v !== null && v !== undefined && String(v).trim().length > 0;
  }

  onEnabledChange(value: boolean) {
    this.user.enabled = value;
    console.log('Enabled value:', value);
  }

  onPassChange(value: boolean) {
    this.user.mostChangePass = value;
    console.log('Enabled value:', value);
  }

  save() {
    this.createUserRequest();
    this.userServie.saveUser(new User, this.userId).subscribe({
      next: (res) => {
        this.user = res;
        if (this.mode === 'create') {
          // no cambies a edit
        }
        this.saveState();
        this.userServie.saveUser(this.user, this.userId ).subscribe({
          next: ok =>{
            this.router.navigate(['/auth/mantenimientos/user'])
          }
        });
      },
      error: (err) => console.log('Error al guardar cliente:', err)
    });
  }

  delete(id:string){
    this.userServie.deleteUser(id).subscribe({
      next: ok => {
        this.router.navigate(['/auth/mantenimientos/user'])
      },
      error : err => {
        console.log(err)
      }
    })
  }

  createUserRequest() {
    this.user = {
      userId: this.user.userId,
      username: this.user.username,
      roles: [
        {
          roleId:this.user.roles[0].roleId,
          roleName:this.user.roles[0].roleName
        }
      ],
      enabled: this.user.enabled,
      createdAt: this.hoy,
      mostChangePass: true,
      passUpdateAt: this.hoy
    }
  }

  private saveState() {
    const state = {
      mode: this.mode,
      personId: this.user?.userId ?? ''
    };

  }

  private syncSelectedRoleFromUser() {
    const roleId = this.user?.roles?.[0]?.roleId ?? '';
    this.selectedRoleId = roleId ? String(roleId) : '';
  }

  private loadUserAndRoles() {
    this.userServie.getUser(this.userId).subscribe({
      next: user => {
        this.user = user;
        this.syncSelectedRoleFromUser();
      },
      error: err => console.log(err)
    });

    this.userServie.getRoles().subscribe({
      next: roles => {
        this.roles = roles;
        this.syncSelectedRoleFromUser();
      },
      error: err => console.log(err)
    });
  }

  get isView(): boolean {
    return this.mode === 'view';
  }

  get isEdite(): boolean {
    return this.mode === 'edit';
  }

  get isCreate(): boolean {
    return this.mode === 'create';
  }

  canEdit(field: string): boolean {
    console.log(this.mode)
    if (this.isView) return false;

    if (this.isEdite) {
      const lockedFields = [
        'userId',
        'createdAt',
        'username',
        'roles',
        'updateDate',
        'enabled',
        'mostChangePass'
      ];
      return !lockedFields.includes(field);
    }

    return true; // create
  }

  onSearchClient() {
    if (this.searchTerm.length < 2) {
      this.clients = [];
      return;
    }

    this.clientService.searchClients(this.searchTerm)
      .subscribe(res => {
        this.clients = res;
        console.log(this.clients)
      });
  }

  selectClient(client: Person) {
  this.user.userId = client.personId;   // 👉 asignar ID
  this.searchTerm = client.name;                 // 👉 limpiar input
  this.showDropdown = false;            // 👉 cerrar dropdown
  this.clients = [];     
  this.person = client;
  }

  onDeselect(nada:string){
      if (!nada || nada.trim() === '') {

    // Limpiar búsqueda
    this.searchTerm = '';

    // Limpiar usuario
    this.user.userId = '';
    this.user.username = '';
    this.user.roles = [];

    // Limpiar persona
    this.person = new Person();

    // Limpiar dropdown
    this.clients = [];
    this.showDropdown = false;

    // Limpiar rol seleccionado
    this.selectedRoleId = '';
  }
  }
}
