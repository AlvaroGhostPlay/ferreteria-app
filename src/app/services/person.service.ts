import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonName } from '../dto/person-name';
import { Client } from '../entitie/client';
import { PersonCudDTO } from '../dto/client-request';
import { Person } from '../entitie/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  uri: string = 'http://localhost:8090/api/persons/person-clients/';
  uri2: string = 'http://localhost:8090/api/persons';

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
}
