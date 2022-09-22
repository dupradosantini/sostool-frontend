import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Roles } from '../workspace.model';

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

}
