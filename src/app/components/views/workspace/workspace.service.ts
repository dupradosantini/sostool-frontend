import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity, Roles, Teams, Workspace } from './workspace.model';
import { Responsibility } from '../model-responsibility/model-responsibility.model';
import { User } from '../users-read/userModel';

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
    const url = `${this.baseUrl}/workspace/${id}`;
    return this.http.get<Workspace>(url);
  }

  findRolesInMoreThanOneTeam(workspaceId: Number): Observable<Roles[]>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/roles-in-many-teams`;
    return this.http.get<Roles[]>(url);
  }

  createRoleInWorkspace(id: Number, roleObj: Roles): Observable<Roles> {
    const url = `${this.baseUrl}/workspace/${id}/businessroles`;
    return this.http.post<Roles>(url, roleObj);
  }

  createResponsibilityInWorkspace(id: Number, responsibilityObj: Responsibility): Observable<Responsibility> {
    const url = `${this.baseUrl}/workspace/${id}/business-responsibilities`;
    return this.http.post<Responsibility>(url,responsibilityObj);
  }

  findModelRoles(): Observable<Roles[]> {
    const url = `${this.baseUrl}/modelrole`;
    return this.http.get<Roles[]>(url);
  }

  findWorkspaceRoles(id: Number): Observable<Roles[]> {
    const url = `${this.baseUrl}/workspace/${id}/businessroles`;
    return this.http.get<Roles[]>(url);
  }

  findWorkspaceResponsibilities(id: Number): Observable<Responsibility[]> {
    const url = `${this.baseUrl}/workspace/${id}/business-responsibilities`;
    return this.http.get<Responsibility[]>(url);
  }

  assignRoleToTeam(workspaceId: Number, teamId: Number, roleId: Number): Observable<Teams[]> {
    const url = `${this.baseUrl}/workspace/${workspaceId}/teams/${teamId}/roles/${roleId}`;
    return this.http.put<Teams[]>(url,null);
  }

  createTeamInWorkspace(workspaceId: Number, team: Teams): Observable<Teams>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/teams`;
    return this.http.post<Teams>(url,team);
  }

  deleteTeamInWorkspace(workspaceId: Number, teamId: Number): Observable<void>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/teams/${teamId}`;
    return this.http.delete<void>(url);
  }

  createWorkspace(workspace: Workspace): Observable<Workspace> {
    const url = `${this.baseUrl}/workspace`;
    return this.http.post<Workspace>(url, workspace);
  }

  findWorkspaceActivities(workspaceId: Number): Observable<Activity[]> {
    const url = `${this.baseUrl}/workspace/${workspaceId}/activities`;
    return this.http.get<Activity[]>(url);
  }

  updateActivity(activityId: number, activityObj: Activity): Observable<Activity>{
    const url = `${this.baseUrl}/activities/${activityId}`;
    return this.http.put<Activity>(url,activityObj);
  }

  findWorkspaceMembers(workspaceId: Number): Observable<User[]>{
    const url = `${this.baseUrl}/users/${workspaceId}/current-members`;
    return this.http.get<User[]>(url);
  }

  addUsersToActivity(activityId: number, usersToBeAdded: User[]): Observable<Activity>{
    const url = `${this.baseUrl}/activities/${activityId}/add-members`;
    return this.http.put<Activity>(url, usersToBeAdded);
  }

  findActivityUsers(activityId: number): Observable<User[]> {
    const url = `${this.baseUrl}/activities/${activityId}/users`;
    return this.http.get<User[]>(url);
  }

  createNewActivity(workspaceId: Number, activity: Activity):Observable<Activity>{
    const url = `${this.baseUrl}/workspace/${workspaceId}/activities`;
    return this.http.post<Activity>(url,activity);
  }
}
