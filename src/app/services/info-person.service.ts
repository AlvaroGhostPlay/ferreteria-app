import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressesPhones } from '../entitie/addresses-phones';
import { AddressPhoneRequest } from '../dto/address-phone-request';

@Injectable({
  providedIn: 'root'
})
export class InfoPersonService {

  uri: string = 'http://localhost:49748/';

  constructor(private http:HttpClient) { }

  getAddressAndPhone(id: string): Observable<AddressesPhones>{
    return this.http.get<AddressesPhones>(this.uri+'all/'+id);
  }

  saveAddressAndPhone(request: AddressPhoneRequest): Observable<AddressesPhones>{
      return this.http.post<AddressesPhones>(this.uri+'address-phone', request);
  }

    updateAddressAndPhone(id: string, request: AddressPhoneRequest): Observable<AddressesPhones>{
      return this.http.put<AddressesPhones>(this.uri+'address-phone/'+id, request);
  }
}
