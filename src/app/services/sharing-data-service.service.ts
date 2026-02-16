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

  private editClientIdSubject = new BehaviorSubject<string>(
    sessionStorage.getItem(this.KEY) ?? ''
  );

  private editClientInfoIdSubject = new BehaviorSubject<ClientInfoState>(
    this.readClientInfoState()
  );

  editClientId$ = this.editClientIdSubject.asObservable();
  editClientInfoId$ = this.editClientInfoIdSubject.asObservable();

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
      mode: (obj?.mode ?? 'create') as Mode, // ✅ ya NO forces edit/create
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
}
