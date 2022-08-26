import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roles, Workspace } from './workspace.model';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findWorkspaces(): Observable<Workspace[]>{
    const url = `${this.baseUrl}/workspace`;
    return this.http.get<Workspace[]>(url);
  }

  findWorkspaceById(id: Number): Observable<Workspace>{
    const url = `${this.baseUrl}/workspace/${id}`
    return this.http.get<Workspace>(url);
  }

  createRoleInWorkspace(id: Number, roleObj: Roles): Observable<Roles> {
    const url = `${this.baseUrl}/workspace/${id}/businessroles`
    return this.http.post<Roles>(url, roleObj);
  }

  findModelRoles(): Observable<Roles[]> {
    const url = `${this.baseUrl}/modelrole`
    return this.http.get<Roles[]>(url);
  }
}
