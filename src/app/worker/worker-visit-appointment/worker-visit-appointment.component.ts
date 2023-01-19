import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Refferal} from "../../classes/visit/Visit";
import {RefferalApiService} from "../../_services/refferal-api.service";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {
  WorkerVisitAppointmentDialogComponent
} from "./worker-visit-appointment-dialog/worker-visit-appointment-dialog.component";

/**
 * Klasa służąca do obsługi logiki związanej z umawianiem wizyty dla pacjenta
 */
@Component({
  selector: 'app-worker-visit-appointment',
  templateUrl: './worker-visit-appointment.component.html',
  styleUrls: ['./worker-visit-appointment.component.css']
})
export class WorkerVisitAppointmentComponent implements OnInit, OnDestroy {

  form: FormGroup

  refferals: Refferal[]

  userId: string;
  private sub: Subscription
  refferalId: string;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private refferalApiService: RefferalApiService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      specialization: ['']
    })
    this.sub = this.form.valueChanges.pipe(
      debounceTime(700),
    ).subscribe(() => {
      if (this.userId) {
        this.refferalApiService
          .getAllUserRefferalsWithSpecialization(this.userId, this.specialization())
          .subscribe(value => {
            this.refferals = value
          })
      }
    })
  }

  /**
   * Metoda służąca do wybierania użytkownika z tabeli dla którego maja zostać wyszukane skierowania
   * @param userId
   */
  chooseUserId(userId: string) {
    this.userId = userId;
    if (this.specialization()) {
      this.refferalApiService
        .getAllUserRefferalsWithSpecialization(this.userId, this.specialization())
        .subscribe(value => {
          this.refferals = value
        })
    } else {
      this.sub = this.refferalApiService
        .getAllUserRefferals(userId)
        .subscribe(value => {
          this.refferals = value
        })
    }

  }

  specialization() {
    return this.form.get("specialization").value;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  /**
   * Metoda służąca do wybierania skierowania
   * @param id - id skierowania (bazodanowe)
   */
  addRefferal(id: string) {
    if (id === this.refferalId) {
      this.refferalId = null;
      return
    }
    this.refferalId = id;
  }

  /**
   * Metoda slużąca do otwierania dialogu do wyboru wolnego terminu
   */
  searchVisit() {
    this.dialog.open(WorkerVisitAppointmentDialogComponent, {
      data: {userId: this.userId, refferalId: this.refferalId},
      width: "100%",
    })

  }
}
