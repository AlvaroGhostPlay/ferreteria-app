import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Mode = 'create' | 'edit' | 'view';

export type ClientInfoState = {
  id: string;
  mode: Mode;
};

export type PersonKind = 'clientes' | 'empleados' | 'proveedores';

export type CrudState = {
  id: string;
  mode: Mode;
  kind: PersonKind;
};

@Injectable({ providedIn: 'root' })
export class SharingDataServiceService {
  private readonly KEY = 'editClientId';
  private readonly KEYINFO = 'editClientInfoId';
  private readonly KEYUSER = 'crudUser';
  private readonly KEYPRODUCT = 'crudProduct';
  private readonly KEYPERSON = 'crudPerson';
    private readonly KEYPERSONINFO = 'info-crud-persons';

  private editClientIdSubject = new BehaviorSubject<string>(
    sessionStorage.getItem(this.KEY) ?? ''
  );

  private editClientInfoIdSubject = new BehaviorSubject<ClientInfoState>(
    this.readClientInfoState()
  );

    private PersonInfoCrud = new BehaviorSubject<CrudState>(
    this.readPersonInfoCrud()
  );

  private crudUser = new BehaviorSubject<ClientInfoState>(
    this.readUserClientInfoState()
  );

  private crudProduct = new BehaviorSubject<ClientInfoState>(
    this.readProductClientInfoState()
  );

  private crudPerson = new BehaviorSubject<CrudState>(this.readCrudPerson());
  

  private crudPersonSubject = new BehaviorSubject<CrudState>(this.readCrudPerson());
crudPerson$ = this.crudPersonSubject.asObservable();

  editClientId$ = this.editClientIdSubject.asObservable();
  editClientInfoId$ = this.editClientInfoIdSubject.asObservable();
  personInfoCrud$ = this.PersonInfoCrud.asObservable();
  userCrud$ = this.crudUser.asObservable();
  productCrud$ = this.crudProduct.asObservable();
  personCrud$ = this.crudPerson.asObservable();

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

    emitPersonCrud(obj: Partial<CrudState>) {
    const safe: CrudState = {
      id: String(obj?.id ?? ''),
      mode: (obj?.mode ?? 'create') as Mode,
      kind: (obj?.kind ?? 'clientes') as PersonKind,
    };

    sessionStorage.setItem(this.KEYPERSON, JSON.stringify(safe));
    this.crudPerson.next(safe);
  }

  clearPersonCrud() {
    sessionStorage.removeItem(this.KEYPERSON);
    this.crudPerson.next({ id: '', mode: 'create', kind: 'clientes' });
  }

  getPersonCrud(): CrudState {
    return this.crudPerson.value;
  }

  private readCrudPerson(): CrudState {
    const raw = sessionStorage.getItem(this.KEYPERSON);
    if (!raw) return { id: '', mode: 'create', kind: 'clientes' };

    try {
      const parsed = JSON.parse(raw);
      const mode = parsed?.mode as Mode;
      const kind = parsed?.kind as PersonKind;

      return {
        id: String(parsed?.id ?? ''),
        mode: (mode === 'edit' || mode === 'view' || mode === 'create') ? mode : 'create',
        kind: (kind === 'clientes' || kind === 'empleados' || kind === 'proveedores') ? kind : 'clientes',
      };
    } catch {
      sessionStorage.removeItem(this.KEYPERSON);
      return { id: '', mode: 'create', kind: 'clientes' };
    }
  }

  emitPersonInfoCrud(obj: CrudState) {
    const safe: CrudState = {
      id: String(obj?.id ?? ''),
      mode: (obj?.mode ?? 'create') as Mode,
      kind: obj.kind
    };

    sessionStorage.setItem(this.KEYPERSONINFO, JSON.stringify(safe));
    this.PersonInfoCrud.next(safe);
  }

  clearPersonInfoCrud() {
    sessionStorage.removeItem(this.KEYPERSONINFO);
    this.PersonInfoCrud.next({ id: '', mode: 'create', kind:'clientes' });
  }

  getPersonInfoCrud(): ClientInfoState {
    return this.PersonInfoCrud.value;
  }

  private readPersonInfoCrud(): CrudState {
    const raw = sessionStorage.getItem(this.KEYPERSONINFO);
    if (!raw) return { id: '', mode: 'create', kind: 'clientes' };

    try {
      const parsed = JSON.parse(raw);
      const mode = parsed?.mode as Mode;
      const kind = parsed?.kind as PersonKind;

      return {
        id: String(parsed?.id ?? ''),
        mode: (mode === 'edit' || mode === 'view' || mode === 'create') ? mode : 'create',
        kind: (kind === 'clientes' || kind === 'empleados' || kind === 'proveedores') ? kind : 'clientes',
      };
    } catch {
      sessionStorage.removeItem(this.KEYPERSONINFO);
      return { id: '', mode: 'create', kind: 'clientes' };
    }
  }
}
