import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RefferalApiService} from "../../../_services/refferal-api.service";

/**
 * Klasa służąca do obsługi logiki związanej z dialogiem do wybierania terminu wizyty dla pacjenta
 */
@Component({
  selector: 'app-worker-visit-appointment-dialog',
  templateUrl: './worker-visit-appointment-dialog.component.html',
  styleUrls: ['./worker-visit-appointment-dialog.component.css']
})
export class WorkerVisitAppointmentDialogComponent implements OnInit, OnDestroy {

  specialization: string

  userId: string;

  refferalId: string;

  displayedColumns: string[] = ['id', 'worker',
    'userFirstName', 'userLastName', 'startTime',
    'visitTypeEnum', 'address', 'actions'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<WorkerVisitAppointmentDialogComponent>,
    private refferalApiService: RefferalApiService,
  ) {
  }

  ngOnDestroy(): void {
    localStorage.setItem("specialization", null)
    localStorage.setItem("refferalId", null)
    localStorage.setItem("visitId", null)
    }

  ngOnInit(): void {
    if (this.data !== undefined) {
      this.userId = this.data.userId;
      this.refferalId = this.data.refferalId;
    }
    if (this.refferalId) {
      this.refferalApiService.getRefferal(this.refferalId).subscribe(value => {
        this.specialization = value.doctorSpecializationEnum
      })
    }

  }

  close() {
    this.dialogRef.close();
  }
}
