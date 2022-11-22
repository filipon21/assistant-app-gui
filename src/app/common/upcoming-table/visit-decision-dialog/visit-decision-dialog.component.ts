import {Component, Inject, OnInit} from '@angular/core';
import {UserApiService} from "../../../_services/user-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Visit} from "../../../classes/visit/Visit";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-visit-decision-dialog',
  templateUrl: './visit-decision-dialog.component.html',
  styleUrls: ['./visit-decision-dialog.component.css']
})
export class VisitDecisionDialogComponent implements OnInit {

  accept: boolean
  visit: Visit
  formGroup: FormGroup

  constructor( private userApiService: UserApiService,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private snackBar: MatSnackBar,
               private router: Router,
               private ref: MatDialogRef<VisitDecisionDialogComponent>,
               private datePipe: DatePipe,
               ) { }

  ngOnInit(): void {
    if (this.data) {
      this.visit = this.data.visit
      this.accept = this.data.accept
    }
  }

  rejectVisit() {
    let now = Date.now();
    this.userApiService.rejectVisit(this.visit.id, this.datePipe.transform(now,
      "yyyy-MM-ddTHH:mm:ss"))
      .subscribe(value => {
        console.log(value)
        this.ref.close(true)

      },
      error => {
        this.snackBar.open("Nie udało się odrzucić wizyty!",
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

  acceptVisit() {
   if (this.visit.visitTypeEnum === 'CHAT'){
     this.userApiService.acceptVisit(this.visit.id, 'https://assistant.zulipchat.com/login/')
       .subscribe(value => {
           console.log(value)
           this.ref.close(true)

         },
         error => {
           this.snackBar.open("Nie udało się zaakceptować wizyty!",
             null, {
               verticalPosition: "top",
               duration: 2000,
               panelClass: "error-snackbar"
             })
         })
   } else {
     this.userApiService.acceptVisit(this.visit.id)
       .subscribe(value => {
           console.log(value)
           this.ref.close(true)

         },
         error => {
           this.snackBar.open("Nie udało się zaakceptować wizyty!",
             null, {
               verticalPosition: "top",
               duration: 2000,
               panelClass: "error-snackbar"
             })
         })
   }
  }
}
