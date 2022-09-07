import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelRole } from './model-role.model';

@Injectable({
  providedIn: 'root'
})
export class ModelRoleService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAllModelRoles(): Observable<ModelRole[]>{
    const url = `${this.baseUrl}/modelrole`;
    return this.http.get<ModelRole[]>(url);
  }

  createNewModelRole(newModelRole: ModelRole): Observable<ModelRole> {
    const url = `${this.baseUrl}/modelrole`;
    return this.http.post<ModelRole>(url, newModelRole);
  }

}
