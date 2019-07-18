import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersList: string[] = ["5d2f6765d27e1243a0cc329a", "5d2f6773d27e1243a0cc329b"];
  userid: string = "";

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loggingIn() {
    for(let i = 0; i < this.usersList.length; i++) {
      if(this.usersList[i] == this.userid) {
        this.service.setCurrentUser(this.userid);
        this.router.navigate([`/homepage`]);
      }
    }
    
  }

}
