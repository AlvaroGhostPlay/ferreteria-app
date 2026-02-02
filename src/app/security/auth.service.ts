import { Injectable } from '@angular/core';
import { AppRole } from './AppRole';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _roles = new BehaviorSubject<AppRole[]>(['ADMIN']); // <-- por ahora ADMIN
  roles$ = this._roles.asObservable();

  get roles(): AppRole[] {
    return this._roles.value;
  }

  setRoles(roles: AppRole[]) {
    this._roles.next(roles);
  }

  hasAnyRole(allowed: AppRole[]) {
    return allowed.some(r => this.roles.includes(r));
  }

  isLoggedIn() {
    // por ahora siempre true; luego con token real
    return true;
  }

  logout() {
    // luego lo conectamos a tu login real
    this._roles.next([]);
  }

  constructor() { }
}
export { AppRole };

