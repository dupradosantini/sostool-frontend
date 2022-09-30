import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './userModel';

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
}
