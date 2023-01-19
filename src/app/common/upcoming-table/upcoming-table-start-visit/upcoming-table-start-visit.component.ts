import {Component, Inject, OnInit} from '@angular/core';
import {UserApiService} from "../../../_services/user-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Visit} from "../../../classes/visit/Visit";

/**
 * Klasa służąca do obsługi logiki związanej z dialogiem
 * do rozpoczęcia wizyty
 */
@Component({
  selector: 'app-upcoming-table-start-visit',
  templateUrl: './upcoming-table-start-visit.component.html',
  styleUrls: ['./upcoming-table-start-visit.component.css']
})
export class UpcomingTableStartVisitComponent implements OnInit {
  visit: Visit;

  constructor(private userApiService: UserApiService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private router: Router,
              private ref: MatDialogRef<UpcomingTableStartVisitComponent>,
              private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.visit = this.data.visit
    }
  }


  close() {
    this.ref.close()
    this.router.navigate(['/worker'])
  }

  startVisit() {
    if (this.visit.visitTypeEnum === 'CHAT'){
      this.userApiService.acceptVisit(this.visit.id, 'https://assistant.zulipchat.com/login/').subscribe(value => {
          this.ref.close(true)
        },
        error => {
          this.snackBar.open("Nie udało się wystartować wizyty! " + error,
            null, {
              verticalPosition: "top",
              duration: 2000,
              panelClass: "error-snackbar"
            })
        })
    }else{
      this.userApiService.acceptVisit(this.visit.id).subscribe(value => {
          this.ref.close(true)
        },
        error => {
          this.snackBar.open("Nie udało się wystartować wizyty! " + error,
            null, {
              verticalPosition: "top",
              duration: 2000,
              panelClass: "error-snackbar"
            })
        })
    }
  }
}
