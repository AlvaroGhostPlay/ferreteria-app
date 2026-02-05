import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  uri: string = 'http://localhost:3000/persons';
  uri2: string = 'http://localhost:3000/persons';
  constructor(private http:HttpClient) { }
}
