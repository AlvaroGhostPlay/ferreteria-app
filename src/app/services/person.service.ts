import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonName } from '../dto/person-name';
import { Client } from '../entitie/client';
import { PersonCudDTO } from '../dto/client-request';
import { Person } from '../entitie/person';
import { PersonKind } from './sharing-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private api = 'http://localhost:8090/api/persons';

  // 👇 Ajustá estas rutas a tu backend real
  private listUrlByKind: Record<PersonKind, string> = {
    clientes:   `${this.api}/person-clients/`,
    empleados:  `${this.api}/person-employees/`,
    proveedores:`${this.api}/person-suppliers/`,
  };

  constructor(private http:HttpClient) { }

  getPersonName(id:string): Observable<PersonName>{
    return this.http.get<PersonName>(this.api+'/person-name/'+id);
  }

  getClients(page:string): Observable<any>{
    return this.http.get<any>(this.api+'/person-clients/'+page);
  }

  getClient(id:string): Observable<Client>{
    return this.http.get<Client>(this.api+'/'+id);
  }

  saveClient(client: PersonCudDTO, clientId: string): Observable<Client>{
    console.log(clientId)
    console.log(client)
    if (clientId && clientId !== '') {
      console.log('Entro al put')
      return this.http.put<Client>(this.api+'/'+clientId, client);
    } else{
      console.log('Entro al post')
      return this.http.post<Client>(this.api, client);
    }
  }

  searchClients(term: string): Observable<Person[]> {
  console.log('Entro')
  return this.http.get<Person[]>(
    `${this.api}/searchClients?term=${term}`
  );
}

  getPersons(kind: PersonKind, page: string): Observable<any> {
    return this.http.get<any>(`${this.listUrlByKind[kind]}${page}`);
  }

  getPerson( id: string): Observable<Person> {
    // si tu backend usa el mismo endpoint para obtener por id:
    return this.http.get<Person>(`${this.api}/${id}`);
  }

  savePerson( body: any, id: string): Observable<Person> {
    if (id && id.trim() !== '') {
      return this.http.put<Person>(`${this.api}/${id}`, body);
    }
    return this.http.post<Person>(`${this.api}`, body);
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
