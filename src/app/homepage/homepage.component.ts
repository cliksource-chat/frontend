import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  currentUser: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUser();
  }

}
