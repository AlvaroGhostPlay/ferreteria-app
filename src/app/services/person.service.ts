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

  uri: string = 'http://localhost:8090/api/persons/person-clients/';
  uri2: string = 'http://localhost:8090/api/persons';

  private api = 'http://localhost:8090/api/persons';

  // 👇 Ajustá estas rutas a tu backend real
  private listUrlByKind: Record<PersonKind, string> = {
    clientes:   `${this.api}/person-clients/`,
    empleados:  `${this.api}/person-employees/`,
    proveedores:`${this.api}/person-suppliers/`,
  };

  constructor(private http:HttpClient) { }

  getPersonName(id:string): Observable<PersonName>{
    return this.http.get<PersonName>(this.uri2+'/person-name/'+id);
  }

  getClients(page:string): Observable<any>{
    console.log('TOKEN =>', sessionStorage.getItem('access_token'));
    return this.http.get<any>(this.uri+page);
  }

  getClient(id:string): Observable<Client>{
    return this.http.get<Client>(this.uri2+'/'+id);
  }

  saveClient(client: PersonCudDTO, clientId: string): Observable<Client>{
    console.log(clientId)
    console.log(client)
    if (clientId && clientId !== '') {
      console.log('Entro al put')
      return this.http.put<Client>(this.uri2+'/'+clientId, client);
    } else{
      console.log('Entro al post')
      return this.http.post<Client>(this.uri2, client);
    }
  }

  searchClients(term: string): Observable<Person[]> {
  console.log('Entro')
  return this.http.get<Person[]>(
    `${this.uri2}/searchClients?term=${term}`
  );
}

  getPersons(kind: PersonKind, page: string): Observable<any> {
    return this.http.get<any>(this.listUrlByKind[kind] + page);
  }

  getPerson(kind: PersonKind, id: string): Observable<Person> {
    // si tu backend usa el mismo endpoint para obtener por id:
    return this.http.get<Person>(`${this.api}/${id}`);
  }

  savePerson(kind: PersonKind, body: any, id: string): Observable<Person> {
    if (id && id.trim() !== '') {
      return this.http.put<Person>(`${this.api}/${id}`, body);
    }
    return this.http.post<Person>(`${this.api}`, body);
  }

  deletePerson(kind: PersonKind, id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
