import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";
import {UserApiService} from "../_services/user-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Klasa służąca do obsługi logiki związanej z komoponentem z panelem pracownika
 */
@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  userId: string;
  displayedColumns: string[] = ['id',
    'userFirstName', 'userLastName', 'startTime',
    'visitTypeEnum', 'address', 'visitStatusEnum', 'actions'];

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userApi: UserApiService,
    private snackBar: MatSnackBar,
    private authService: UserAuthService,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.userAuthService.getId();
  }

  goToCurrentVisit() {
    this.userApi.getUserStartedVisit(this.authService.getId()).subscribe(value => {
      if (!value) {
        this.snackBar.open("Aktualnie nie masz telewizyty"
          , '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['multiline-snackbar', 'error-snackbar']
          });
        this.router.navigate(['/worker'])
      } else {
        let obj = value.users
          .find((obj => obj.roles[0].roleName === 'USER'));
        this.router.navigate(['/worker-visit-details'],
          {queryParams: {visitId: value.id, userTableId: obj.id}});
      }
    })
  }

  goToFindPatient() {
    this.router.navigate(['/worker-visit-appointment'])
  }

  goToHistory() {
    this.router.navigate(['/worker-history'])

  }

  goToCancelVisit() {
    this.router.navigate(['/worker-visit-cancel'])

  }

  goToDrugs() {
    this.router.navigate(['/worker-drugs'])

  }

}
