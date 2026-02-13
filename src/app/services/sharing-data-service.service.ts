import { EventEmitter, Injectable } from '@angular/core';
type User = {
    id: number;
  };

@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceService {

  private EventEmmiterUpdateClient = new EventEmitter<string>();


  constructor() { }

  get updateClient$() {
    return this.EventEmmiterUpdateClient;
  }

  // método para emitir el id
  emitUpdateClient(id: string) {
    this.EventEmmiterUpdateClient.emit(id);
  }
}
