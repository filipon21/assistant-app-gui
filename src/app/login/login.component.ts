import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserAuthService} from '../_services/user-auth.service';
import {UserService} from '../_services/user.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        const id = response.user.id;
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setId(id);
        this.userAuthService.setToken(response.jwtToken);

        this.userService.setIsOnline('true', parseInt(this.userAuthService.getId())).subscribe((data) => {
          console.log(data)
        })

        const role = response.user.roles[0].roleName;
        if (role === 'DOCTOR') {
          this.router.navigate(['/doctor']);
        }
        if (role === 'ASSISTANT') {
          this.router.navigate(['/assistant']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        this.snackBar.open("Logowanie nie powiodło się! Nieprawidłowy email lub hasło!", '', {
          duration: 3000,
          panelClass: ['error-snackbar', 'multiline-snackbar']
        });
      }
    );
  }
}
