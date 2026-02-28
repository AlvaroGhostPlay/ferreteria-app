import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entitie/user';
import { Role } from '../entitie/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uri: string = 'http://localhost:8090/api/users';

    getUsers(page: string): Observable<any>{
      return this.httpClient.get<any>(this.uri+'/page/'+page);
    }

    getUser(id: string): Observable<User>{
      return this.httpClient.get<User>(this.uri+id);
    }

    getUserByUsername(username: string): Observable<User>{
      return this.httpClient.get<User>(this.uri+'/username/'+username);
    }

    getRoles():Observable<Role[]>{
      return this.httpClient.get<Role[]>(this.uri+"/role");
    }

    saveUser(user: User, id: string):Observable<User>{
      if (id !== '' && id !== ' '){
        return this.httpClient.put<User>(this.uri+"/id",user);
      }
      return this.httpClient.post<User>(this.uri,user);
    }

    deleteUser(id: string) :Observable<User>{
      return this.httpClient.delete<User>(this.uri+"/id");
    }
}
