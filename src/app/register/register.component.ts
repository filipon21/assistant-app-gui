import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserApiService} from "../_services/user-api.service";
import {UserAuthService} from "../_services/user-auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PeselValidator} from "../shared/validators/PeselValidator";
import {first} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService,
    private snackBar: MatSnackBar,
    private authService: UserAuthService,
    private datePipe: DatePipe
  ) {

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userFirstName: ['', [Validators.required, Validators.maxLength(100)]],
      userLastName: ['', [Validators.required, Validators.maxLength(100)]],
      userName: ['', [Validators.email, Validators.required, Validators.maxLength(100)]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      pesel: ['', [Validators.required, PeselValidator]],
      passwordCheck: ['', [Validators.required, this.matchValues('userPassword')]],
      birthday: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9),
        Validators.pattern("^[0-9]*$")]],
      voivodeship: ['', [Validators.required, Validators.maxLength(100)]],
      postalCode: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9/-]*$")]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      town: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.userApiService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.snackBar.open("Zarejestrowano się!", '', {
            duration: 3000,
            panelClass: ['multiline-snackbar']
          });
          this.router.navigate(['/login'], { relativeTo: this.route });
        },
        error => {
          this.snackBar.open("Nie udało się zarejestrować!", '', {
            duration: 3000,
            panelClass: ['multiline-snackbar', 'error-snackbar']
          });
        });
  }

}


