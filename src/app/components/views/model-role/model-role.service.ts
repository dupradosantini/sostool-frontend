import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelRoleService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

}
