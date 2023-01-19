import {Component, Inject, OnInit} from '@angular/core';
import {UserApiService} from "../../../_services/user-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

/**
 * Klasa służąca do obsługi dialogu związanego z komoponentem z wolnymi wizytami (potwierdzenie)
 */
@Component({
  selector: 'app-free-table-dialog',
  templateUrl: './free-table-dialog.component.html',
  styleUrls: ['./free-table-dialog.component.css']
})
export class FreeTableDialogComponent implements OnInit {

  constructor(
    private userApiService: UserApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private router: Router,
    private ref: MatDialogRef<FreeTableDialogComponent>,
  ) {
  }

  refferalId: string;
  userId: string;
  visitId: string;

  ngOnInit(): void {
    if (this.data) {
      this.userId = this.data.userId
      this.visitId = this.data.visitId
    }
    if (this.data.refferalId) {
      this.refferalId = this.data.refferalId
    }
  }

  /**
   * Metoda służąca do dodawania użytkownika do wolnej wizyty
   */
  makeAnApointment() {
    if (this.refferalId) {
      this.userApiService.addUserToVisit(this.userId, this.refferalId, this.visitId).subscribe(value => {
          console.log(value)
          this.ref.close(true)

        },
        error => {
          this.snackBar.open("Wizyta jest już zajęta",
            null, {
              verticalPosition: "top",
              duration: 2000,
              panelClass: "error-snackbar"
            })
          this.ref.close(true)
        })
    }else{
      this.userApiService.addUserToVisitWithoutParams(this.userId, this.visitId).subscribe(value => {
          console.log(value)
          this.ref.close(true)

        },
        error => {
          this.snackBar.open("Wizyta jest już zajęta!",
            null, {
              verticalPosition: "top",
              duration: 2000,
              panelClass: "error-snackbar"
            })
        })
      this.ref.close(true)
    }
  }

  close() {
    this.ref.close()
  }
}
