import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  viewControl: 'LOGOUT' | 'LOGGED' = 'LOGOUT';

  constructor(
    private userAuthService: UserAuthService
  ) {
  }

  ngOnInit(): void {
    if (this.userAuthService.isLoggedIn()) {
      this.viewControl = 'LOGGED';
    } else {
      this.viewControl = 'LOGOUT';
    }
  }


}
