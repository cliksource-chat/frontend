import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static currentUser: string = "";
  url: string = "http://localhost:8090";

  constructor(private http: HttpClient) { }

  setCurrentUser(newUser: string) {
    LoginService.currentUser = newUser;
  }

  getCurrentUser(): string {
    return LoginService.currentUser;
  }

  validUser(userid: string): Observable<User> {
    console.log("Getting user with id: " + userid);
    return this.http.get<User>(`${this.url}/api/users/${userid}`);
  }
}
