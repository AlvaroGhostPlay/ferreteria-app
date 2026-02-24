import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Mode = 'create' | 'edit' | 'view';

export type ClientInfoState = {
  id: string;
  mode: Mode;
};

@Injectable({ providedIn: 'root' })
export class SharingDataServiceService {
  private readonly KEY = 'editClientId';
  private readonly KEYINFO = 'editClientInfoId';
  private readonly KEYUSER = 'crudUser';
  private readonly KEYPRODUCT = 'crudProduct';
  private readonly KEYEMPLOYEE= 'employeeCrud';

  private editClientIdSubject = new BehaviorSubject<string>(
    sessionStorage.getItem(this.KEY) ?? ''
  );

  private editClientInfoIdSubject = new BehaviorSubject<ClientInfoState>(
    this.readClientInfoState()
  );

  private crudUser = new BehaviorSubject<ClientInfoState>(
    this.readUserClientInfoState()
  );

  private crudProduct = new BehaviorSubject<ClientInfoState>(
    this.readProductClientInfoState()
  );

  private crudEmployee = new BehaviorSubject<ClientInfoState>(
    this.readUserEmployeeInfoState()
  );

  editClientId$ = this.editClientIdSubject.asObservable();
  editClientInfoId$ = this.editClientInfoIdSubject.asObservable();
  userCrud$ = this.crudUser.asObservable();
  productCrud$ = this.crudProduct.asObservable();
  employeeCrud$ = this.crudEmployee.asObservable();

  // ✅ Solo ID (si querés mantenerlo)
  emitUpdateClient(id: string) {
    const value = id ?? '';
    sessionStorage.setItem(this.KEY, value);
    this.editClientIdSubject.next(value);
  }

  clearEditClientId() {
    sessionStorage.removeItem(this.KEY);
    this.editClientIdSubject.next('');
  }

  getEditClientId(): string {
    return this.editClientIdSubject.value;
  }

  // ✅ Estado completo: create/edit/view
  emitUpdateClientInfo(obj: ClientInfoState) {
    const safe: ClientInfoState = {
      id: String(obj?.id ?? ''),
      mode: (obj?.mode ?? 'create') as Mode,
    };

    sessionStorage.setItem(this.KEYINFO, JSON.stringify(safe));
    this.editClientInfoIdSubject.next(safe);
  }

  clearEditClientInfo() {
    sessionStorage.removeItem(this.KEYINFO);
    this.editClientInfoIdSubject.next({ id: '', mode: 'create' });
  }

  getEditClientInfo(): ClientInfoState {
    return this.editClientInfoIdSubject.value;
  }

  private readClientInfoState(): ClientInfoState {
    const raw = sessionStorage.getItem(this.KEYINFO);
    if (!raw) return { id: '', mode: 'create' };

    try {
      const parsed = JSON.parse(raw);
      const mode = parsed?.mode as Mode;

      return {
        id: String(parsed?.id ?? ''),
        mode: (mode === 'edit' || mode === 'view' || mode === 'create') ? mode : 'create',
      };
    } catch {
      sessionStorage.removeItem(this.KEYINFO);
      return { id: '', mode: 'create' };
    }
  }

  emitProductCrud(obj: ClientInfoState) {
    const safe: ClientInfoState = {
      id: String(obj?.id ?? ''),
      mode: (obj?.mode ?? 'create') as Mode,
    };

    sessionStorage.setItem(this.KEYPRODUCT, JSON.stringify(safe));
    this.crudProduct.next(safe);
  }

  clearProductCrud() {
    sessionStorage.removeItem(this.KEYPRODUCT);
    this.crudProduct.next({ id: '', mode: 'create' });
  }

  getProductInfo(): ClientInfoState {
    return this.crudProduct.value;
  }

  private readProductClientInfoState(): ClientInfoState {
    const raw = sessionStorage.getItem(this.KEYPRODUCT);
    if (!raw) return { id: '', mode: 'create' };

    try {
      const parsed = JSON.parse(raw);
      const mode = parsed?.mode as Mode;

      return {
        id: String(parsed?.id ?? ''),
        mode: (mode === 'edit' || mode === 'view' || mode === 'create') ? mode : 'create',
      };
    } catch {
      sessionStorage.removeItem(this.KEYUSER);
      return { id: '', mode: 'create' };
    }
  }


  emitEmployee(obj: ClientInfoState) {
    const safe: ClientInfoState = {
      id: String(obj?.id ?? ''),
      mode: (obj?.mode ?? 'create') as Mode,
    };

    sessionStorage.setItem(this.KEYEMPLOYEE, JSON.stringify(safe));
    this.crudEmployee.next(safe);
  }

  clearEmployee() {
    sessionStorage.removeItem(this.KEYEMPLOYEE);
    this.crudEmployee.next({ id: '', mode: 'create' });
  }

  getEmployeeInfo(): ClientInfoState {
    return this.crudEmployee.value;
  }

  private readUserEmployeeInfoState(): ClientInfoState {
    const raw = sessionStorage.getItem(this.KEYEMPLOYEE);
    if (!raw) return { id: '', mode: 'create' };

    try {
      const parsed = JSON.parse(raw);
      const mode = parsed?.mode as Mode;

      return {
        id: String(parsed?.id ?? ''),
        mode: (mode === 'edit' || mode === 'view' || mode === 'create') ? mode : 'create',
      };
    } catch {
      sessionStorage.removeItem(this.KEYEMPLOYEE);
      return { id: '', mode: 'create' };
    }
  }

  emitUserId(obj: ClientInfoState) {
    const safe: ClientInfoState = {
      id: String(obj?.id ?? ''),
      mode: (obj?.mode ?? 'create') as Mode,
    };

    sessionStorage.setItem(this.KEYUSER, JSON.stringify(safe));
    this.crudUser.next(safe);
  }

  clearUserId() {
    sessionStorage.removeItem(this.KEYUSER);
    this.crudUser.next({ id: '', mode: 'create' });
  }

  getUserInfo(): ClientInfoState {
    return this.crudUser.value;
  }

  private readUserClientInfoState(): ClientInfoState {
    const raw = sessionStorage.getItem(this.KEYUSER);
    if (!raw) return { id: '', mode: 'create' };

    try {
      const parsed = JSON.parse(raw);
      const mode = parsed?.mode as Mode;

      return {
        id: String(parsed?.id ?? ''),
        mode: (mode === 'edit' || mode === 'view' || mode === 'create') ? mode : 'create',
      };
    } catch {
      sessionStorage.removeItem(this.KEYUSER);
      return { id: '', mode: 'create' };
    }
  }
}
