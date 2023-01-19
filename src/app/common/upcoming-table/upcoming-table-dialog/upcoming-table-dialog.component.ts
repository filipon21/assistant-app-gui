import {Component, Inject, OnInit} from '@angular/core';
import {UserApiService} from "../../../_services/user-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

/**
 * Klasa służąca do obsługi logiki związanej z dialogiem
 * do odwołania wizyty (pacjent)
 */
@Component({
  selector: 'app-upcoming-table-dialog',
  templateUrl: './upcoming-table-dialog.component.html',
  styleUrls: ['./upcoming-table-dialog.component.css']
})
export class UpcomingTableDialogComponent implements OnInit {

  constructor(
    private userApiService: UserApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private router: Router,
    private ref: MatDialogRef<UpcomingTableDialogComponent>,
    private datePipe: DatePipe,
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

  cancelVisit() {
    if (this.data.status === 'WAITING'){
      let now = Date.now();
      this.userApiService.rejectVisit(this.visitId, this.datePipe.transform(now,
        "yyyy-MM-ddTHH:mm:ss")).subscribe(value => {
          this.ref.close(true)
        },
        error => {
          this.snackBar.open("Nie udało się odwołać wizyty! " + error,
            null, {
              verticalPosition: "top",
              duration: 2000,
              panelClass: "error-snackbar"
            })
        })
    }else {
      this.userApiService.cancelVisit(this.visitId, this.refferalId, this.userId).subscribe(value => {
          this.ref.close(true)
        },
        error => {
          this.snackBar.open("Nie udało się odwołać wizyty! " + error,
            null, {
              verticalPosition: "top",
              duration: 2000,
              panelClass: "error-snackbar"
            })
        })
    }
  }

  close() {
    this.ref.close()
  }

}
