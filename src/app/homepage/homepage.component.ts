import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  userid: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.userid = this.loginService.getCurrentUser();
  }

}
