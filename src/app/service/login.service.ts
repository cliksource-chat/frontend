import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static currentUser: string = "";

  constructor() { }

  setCurrentUser(newUser: string) {
    LoginService.currentUser = newUser;
  }

  getCurrentUser(): string {
    return LoginService.currentUser;
  }
}
