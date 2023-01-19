import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserAuthService} from '../_services/user-auth.service';
import {UserApiService} from '../_services/user-api.service';
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Klasa służąca do obsługi logiki związanej z formularzem do logowania
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserApiService,
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
        this.userAuthService.setName(response.user.userFirstName + " " + response.user.userLastName);
        this.userAuthService.setToken(response.jwtToken);

        this.userService.setIsOnline('true', parseInt(this.userAuthService.getId())).subscribe((data) => {
          console.log(data)
        })

        const role = response.user.roles[0].roleName;
        if (role === 'DOCTOR') {
          this.router.navigate(['/worker']);
        }
        if (role === 'ASSISTANT') {
          this.router.navigate(['/worker']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        this.snackBar.open("Logowanie nie powiodło się! Nieprawidłowy email lub hasło!", '', {
          duration: 3000,
          verticalPosition:"top",
          panelClass: ['error-snackbar', 'multiline-snackbar']
        });
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
