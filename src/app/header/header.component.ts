import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserApiService } from '../_services/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: string;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserApiService,
  ) {}

  ngOnInit(): void {
    this.name = this.userAuthService.getName();
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userService.setIsOnline('false', parseInt(this.userAuthService.getId()))
      .subscribe((data) => {
      console.log(data)
    })

    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

}
