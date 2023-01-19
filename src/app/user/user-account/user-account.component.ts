import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PeselValidator} from 'src/app/shared/validators/PeselValidator';
import {UserApiService} from "../../_services/user-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserAuthService} from "../../_services/user-auth.service";
import {User} from "../../classes/user/User";

/**
 * Klasa służąca do obsługi związanej z komoponentem z edycją konta użytkownika
 */
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit{
  accountForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private userServiceApi: UserApiService,
    private snackBar: MatSnackBar,
    private userAuthService: UserAuthService,
  ) {
  }

  ngOnInit(): void {
    this.userServiceApi.getUser(this.userAuthService.getId()).subscribe(value => {
      this.user = value;
      this.accountForm = this.formBuilder.group({
        userFirstName: [this.user?.userFirstName ?? '', [Validators.required, Validators.maxLength(100)]],
        userLastName: [this.user?.userLastName ?? '', [Validators.required, Validators.maxLength(100)]],
        userName: [this.user?.userName ?? '', [Validators.email, Validators.required, Validators.maxLength(100)]],
        phoneNumber: [this.user?.phoneNumber ?? '', [Validators.pattern(/([0-9])/i), Validators.required, Validators.maxLength(12),
          Validators.minLength(9)]],
        pesel: [this.user?.pesel ?? '', [Validators.required, Validators.maxLength(11), Validators.minLength(11), PeselValidator]],
        address: [this.user?.address ?? '', [Validators.required, Validators.maxLength(100)]],
        postalCode: [this.user?.postalCode ?? '', [Validators.required, Validators.maxLength(10)]],
        voivodeship: [this.user?.voivodeship ?? '', [Validators.required, Validators.maxLength(100)]],
        country: [this.user?.country ?? '', [Validators.required, Validators.maxLength(100)]],
        town: [this.user?.town ?? '', [Validators.required, Validators.maxLength(100)]],
      });
    })
  }

  /**
   * Metoda śłużąca do wysyłania requesta na serwer z edycją konta
   */
  saveAccount() {
    if (!this.validateInputs()) {
      return
    } else {
      this.userServiceApi.updateUser(this.accountForm.value, this.userAuthService.getId()).subscribe(value => {
        this.snackBar.open("Zaktualizowano informacje o użytkowniku", '', {
          duration: 5000,
          panelClass: ['multiline-snackbar', 'snackbarStyle']
        });
        this.user = value;
      })
    }
  }

  /**
   * Metoda służąca do sprawdzania czy wszystkie pola są poprawnie wypełnione
   */
  validateInputs() {
    let validationErrorMessage = '';

    if (!this.userFirstName.valid) {
      validationErrorMessage += 'Niepoprawne imię (do 100 znaków)!\n';
    }
    if (!this.userLastName.valid) {
      validationErrorMessage += 'Niepoprawne nazwisko (do 100 znaków)!\n';
    }
    if (!this.userName.valid) {
      validationErrorMessage += 'Niepoprawny email (do 100 znaków)!\n';
    }
    if (!this.phoneNumber.valid) {
      validationErrorMessage += 'Niepoprawny numer telefonu (do 12 znaków)!\n';
    }
    if (!this.pesel.valid) {
      validationErrorMessage += 'Niepoprawny pesel (do 11 znaków)!\n';
    }
    if (!this.address.valid) {
      validationErrorMessage += 'Niepoprawny adres (do 100 znaków)!\n';
    }
    if (!this.postalCode.valid) {
      validationErrorMessage += 'Niepoprawny email (do 10 znaków)!\n';
    }
    if (!this.voivodeship.valid) {
      validationErrorMessage += 'Niepoprawne województwo (do 100 znaków)!\n';
    }
    if (!this.country.valid) {
      validationErrorMessage += 'Niepoprawny kraj (do 100 znaków)!\n';
    }
    if (!this.town.valid) {
      validationErrorMessage += 'Niepoprawna miejscowość (do 100 znaków)!\n';
    }
    if (validationErrorMessage !== '') {
      this.snackBar.open(validationErrorMessage, '', {
        duration: 5000,
        panelClass: ['multiline-snackbar', 'snackbarStyle']
      });
      return false;
    }
    return true;
  }

  get userFirstName() {
    return this.accountForm.get('userFirstName');
  }

  get town() {
    return this.accountForm.get('town');
  }

  get userLastName() {
    return this.accountForm.get('userLastName');
  }

  get userName() {
    return this.accountForm.get('userName');
  }

  get phoneNumber() {
    return this.accountForm.get('phoneNumber');
  }

  get pesel() {
    return this.accountForm.get('pesel');
  }

  get address() {
    return this.accountForm.get('address');
  }

  get postalCode() {
    return this.accountForm.get('postalCode');
  }

  get voivodeship() {
    return this.accountForm.get('voivodeship');
  }

  get country() {
    return this.accountForm.get('country');
  }
}
