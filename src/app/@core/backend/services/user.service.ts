import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080/Users";

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }

  createUser(user: User):Observable<User>{    
    return this.http.post<User>(this.baseUrl, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  } 

  deleteUser(idU: any):void{    
    this.http.delete(`${this.baseUrl}/${idU}`).subscribe(data => {
    });
  }

  getUserById(idU: number):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${idU}`);
  }

  updateUser(user: User):Observable<User>{
    return this.http.put<User>(this.baseUrl, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
