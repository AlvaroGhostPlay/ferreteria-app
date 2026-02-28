import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuGroup } from '../entitie/menu-group';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  api: string = 'http://localhost:8090/api/navigation'
  constructor(private httpClient: HttpClient) { }

    getNadvar(idJobrole:string, isMenu:boolean): Observable<MenuGroup[]>{
      return this.httpClient.get<MenuGroup[]>(this.api+'/menus/by-worker/'+idJobrole+'?isMenu='+isMenu);
    }
}
