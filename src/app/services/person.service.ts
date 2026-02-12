import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../entitie/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  uri: String = 'http://localhost:62292/person-clients/';
  uri2: String = 'http://localhost:62292/';

  constructor(private http:HttpClient) { }

  getClients(page:string): Observable<any>{
    return this.http.get<any>(this.uri+page);
  }

  getClient(id:string): Observable<Person>{
    return this.http.get<Person>(this.uri2+id);
  }
}
