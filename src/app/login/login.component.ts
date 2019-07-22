import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid: string = "";

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loggingIn() {

    this.service.validUser(this.userid)
      .subscribe(
        (data: User) => {
          this.service.setCurrentUser(data);
          this.router.navigate([`/homepage`]);
        },
        (error: any) => console.log(error),
        () => console.log('fetched user')
      );
    
  }

}
