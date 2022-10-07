import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleHistoryItem, User } from './userModel';

@Injectable({
  providedIn: 'root'
})
export class UserReadService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAllUsers():Observable<User[]>{
    const url = `${this.baseUrl}/users`;
    return this.http.get<User[]>(url);
  }

  createUser(userObj: User):Observable<User>{
    const url = `${this.baseUrl}/users`;
    return this.http.post<User>(url,userObj);
  }

  findUsersRoleHistory(userId: number):Observable<RoleHistoryItem[]>{
    const url = `${this.baseUrl}/users/${userId}/role-history`
    return this.http.get<RoleHistoryItem[]>(url);

  }
}
