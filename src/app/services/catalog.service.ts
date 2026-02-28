import { Injectable } from '@angular/core';
import { Client } from '../entitie/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersonType } from '../entitie/person-type';
import { Gener } from '../entitie/gener';
import { SocuialStatus } from '../entitie/status-social';
import { DocumentType } from '../entitie/document-type';
import { AddressType } from '../entitie/address-type';
import { PhoneType } from '../entitie/phone-type';
import { Brand } from '../entitie/brand';
import { Category } from '../entitie/category';
import { JobRoleDto } from '../entitie/job-role';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  uri: String = 'http://localhost:8090/api/catalog/';

  constructor(private http:HttpClient) { }

  getPersonType(): Observable<PersonType[]>{
    return this.http.get<PersonType[]>(this.uri+'person-type');
  }

  getDocumentType(): Observable<DocumentType[]>{
    return this.http.get<DocumentType[]>(this.uri+'document-type');
  }

  getGener(): Observable<Gener[]>{
    return this.http.get<Gener[]>(this.uri+'gener');
  }

  getStatusSocialType(): Observable<SocuialStatus[]>{
    return this.http.get<SocuialStatus[]>(this.uri+'social-status');
  }

  getAddressType(): Observable<AddressType[]>{
    return this.http.get<AddressType[]>(this.uri+'address-type');
  }

  getPhonesType(): Observable<PhoneType[]>{
    return this.http.get<PhoneType[]>(this.uri+'phone-type');
  }

  getBrandType(): Observable<Brand[]>{
    return this.http.get<Brand[]>(this.uri+'brand');
  }

  getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(this.uri+'category');
  }
}
