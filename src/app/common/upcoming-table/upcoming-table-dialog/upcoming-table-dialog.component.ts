import {Component, Inject, OnInit} from '@angular/core';
import {UserApiService} from "../../../_services/user-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
    console.log(this.refferalId)
      this.userApiService.cancelVisit(this.visitId, this.refferalId, this.userId).subscribe(value => {
          console.log(value)
          this.ref.close(true)

        },
        error => {
          this.snackBar.open("Nie udało się odwołać wizyty!",
            null, {
              verticalPosition: "top",
              duration: 2000,
              panelClass: "error-snackbar"
            })
        })
  }

  close() {
    this.ref.close()
  }

}
