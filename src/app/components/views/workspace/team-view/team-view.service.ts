import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Roles } from '../workspace.model';
import { Responsibility } from '../../model-responsibility/model-responsibility.model';
import { User } from '../../users-read/userModel';

@Injectable({
  providedIn: 'root'
})
export class TeamViewService {


  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  assignResponsibilityToRole(workspaceId: Number, roleId: Number, respId: Number): Observable<Roles[]> {
    const url = `${this.baseUrl}/workspace/${workspaceId}/businessroles/${roleId}/responsibilities/${respId}`;
    return this.http.put<Roles[]>(url,null);
  }

  removeResponsibilityFromRole(workspaceId: Number, roleId: Number, respId: Number): Observable<Responsibility[]>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/businessroles/${roleId}/responsibilities/${respId}/remove`
    return this.http.put<Responsibility[]>(url,null);
  }

  removeMemberFromRole(workspaceId:Number, roleId: Number, member: User):Observable<User[]>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/businessroles/${roleId}/member-remove`;
    return this.http.put<User[]>(url,member);
  }

  assignUserToRole(workspaceId: Number, roleId: Number, userId: number):Observable<User[]>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/businessroles/${roleId}/member/${userId}`
    return this.http.put<User[]>(url,null);
  }

  getRoleAssignedUsers(workspaceId: Number, roleId: Number):Observable<User[]>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/businessroles/${roleId}/members`
    return this.http.get<User[]>(url);
  }

  findWorkspaceRolesInTeam(workspaceId: Number, teamId: Number): Observable<Roles[]>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/teams/${teamId}/roles`
    return this.http.get<Roles[]>(url);
  }

}
