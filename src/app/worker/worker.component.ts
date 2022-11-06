import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";

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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userId = this.userAuthService.getId();
  }

  goToCurrentVisit() {
    let id = localStorage.getItem('visitId')
    if (id) {
      this.router.navigate(['/worker-visit-details'],
        {queryParams: {visitId: id}});
    }
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
