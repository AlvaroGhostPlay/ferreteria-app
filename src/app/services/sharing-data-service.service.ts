import { EventEmitter, Injectable } from '@angular/core';
type User = {
    id: number;
  };

@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceService {

  private _ClienteCreateventEmitter = new EventEmitter<any>();

  constructor() { }

  get ClienteCreateventEmitter(){
    return this._ClienteCreateventEmitter;
  }
}
