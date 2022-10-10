import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PeselValidator} from 'src/app/shared/validators/PeselValidator';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  accountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      userFirstName: ['', [Validators.required, Validators.maxLength(100)]],
      userLastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.email, Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.pattern(/([0-9])/i), Validators.required, Validators.maxLength(12),
        Validators.minLength(9)]],
      pesel: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), PeselValidator]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      postalCode: ['', [Validators.required,Validators.maxLength(10)]],
      voivodeship: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  saveAccount() {
    console.log(this.accountForm)
  }
}
