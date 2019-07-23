import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static currentUser: User;
  url: string = "http://localhost:8090";

  constructor(private http: HttpClient) { }

  setCurrentUser(newUser: User) {
    LoginService.currentUser = newUser;
  }

  getCurrentUser(): User {
    return LoginService.currentUser;
  }

  getCurrentUserID(): string {
    return LoginService.currentUser.id;
  }

  getCurrentUserType(): string {
    return LoginService.currentUser.type;
  }

  validUser(userid: string): Observable<User> {
    console.log("Getting user with id: " + userid);
    return this.http.get<User>(`${this.url}/api/users/${userid}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/api/users`);
  }
}
