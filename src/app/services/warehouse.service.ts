import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserJobRole } from '../entitie/user-job-role';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  uri: String = 'http://localhost:8090/api/warehouse'
  constructor(private http:HttpClient) { }

  getWarehouseAndJobRole(idUser:string): Observable<UserJobRole>{
    return this.http.get<UserJobRole>(this.uri+'/roles/user/'+idUser);
  }
}
