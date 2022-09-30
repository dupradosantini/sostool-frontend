import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelResponsibility } from './model-responsibility.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelResponsibilityService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAllModelResponsibilities():Observable<ModelResponsibility[]>{
    const url = `${this.baseUrl}/model-responsibility`;
    return this.http.get<ModelResponsibility[]>(url);
  }

  createNewModelResponsibility(newModelResponsibility: ModelResponsibility): Observable<ModelResponsibility> {
    const url = `${this.baseUrl}/model-responsibility`;
    return this.http.post<ModelResponsibility>(url, newModelResponsibility);
  }

  updateModelResponsibility(modelRespObj: ModelResponsibility): Observable<ModelResponsibility> {
    const url = `${this.baseUrl}/model-responsibility/edit`
    return this.http.post<ModelResponsibility>(url,modelRespObj);
  }
}
