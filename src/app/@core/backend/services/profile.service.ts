import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = "http://localhost:8080/Profiles";

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<Profile[]>{
    return this.http.get<Profile[]>(this.baseUrl);
  }

  
}
