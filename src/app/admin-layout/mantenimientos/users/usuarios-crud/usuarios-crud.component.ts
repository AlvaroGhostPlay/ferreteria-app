import { Component } from '@angular/core';
import { Mode, SharingDataServiceService } from '../../../../services/sharing-data-service.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../entitie/user';
import { NavigationStart, Router } from '@angular/router';
import { Role } from '../../../../entitie/role';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-crud',
  imports: [FormsModule],
  templateUrl: './usuarios-crud.component.html'
})
export class UsuariosCrudComponent {

  userId: string = '';
  mode: Mode = 'create';
  private destroy$ = new Subject<void>();

  types: boolean[] = [true, false]

  user: User = new User();
  roles: Role[] = [];

  selectedRoleId: string = '';

  constructor(
    private sharingDataService: SharingDataServiceService,
    private userServie: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sharingDataService.userCrud$
      .subscribe((obj: any) => {
        this.userId = obj.id;
        this.mode = obj.mode;


        this.userServie.getUser(this.userId).subscribe({
          next: user => {
            this.user = user;
            this.syncSelectedRoleFromUser();

                this.userServie.getRoles().subscribe({
      next: roles => {
        this.roles = roles;
        console.log(roles)
        this.syncSelectedRoleFromUser();
        if(this.userId=== ''){
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
      this.sharingDataService.emitUserId({id: this.userId, mode: this.mode});
      if (this.mode === 'create') {
        this.router.navigate(['/auth/mantenimientos/user'])
      }
      if (this.mode === 'edit') {
        this.router.navigate(['/auth/mantenimientos/user'])
      }
      },
      error: (err) => console.log('Error al guardar cliente:', err)
    });
  }

  createUserRequest(){

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
}
