import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserApiService} from "../../_services/user-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {UserAuthService} from "../../_services/user-auth.service";

/**
 * Klasa służąca do obsługi logiki związanej z komponentem do dodawania wolnych terminów wizyt
 * (pracownik)
 */
@Component({
  selector: 'app-worker-add-visit',
  templateUrl: './worker-add-visit.component.html',
  styleUrls: ['./worker-add-visit.component.css']
})
export class WorkerAddVisitComponent implements OnInit {
  visitForm: FormGroup;
  subForReq: Subscription = new Subscription()
  todayDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private visitApiService: UserApiService,
    private snackBar: MatSnackBar,
    private authService: UserAuthService
  ) {
  }


  ngOnInit(): void {
    this.visitForm = this.formBuilder.group({
      visitTypeEnum: ['', [Validators.required, Validators.maxLength(100)]],
      startTime: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.subForReq.add(this.visitForm?.get('visitTypeEnum')?.valueChanges.pipe(
      debounceTime(100)).subscribe(value => {
        if (value === 'STATIONARY'){
          this.visitForm.get('address').setValidators([Validators.required])
        }else{
          this.visitForm.get('address').clearValidators()
        }
        this.visitForm.get('address').updateValueAndValidity()
      console.log(this.visitForm.get('startTime'))
      }))
  }

  saveVisit() {
    this.visitApiService.addVisit(this.visitForm.value, this.authService.getId()).subscribe(value => {
      this.snackBar.open("Dodano wolny termin", '', {
        duration: 5000,
        panelClass: ['multiline-snackbar', 'snackbarStyle']
      });
    })
  }
}
