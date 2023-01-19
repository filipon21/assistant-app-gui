import { Component } from '@angular/core';
import {UserApiService} from "../../_services/user-api.service";

/**
 * Klasa służąca do obsługi logiki związanej z odwoływaniem wizyt pacjenta
 */
@Component({
  selector: 'app-worker-visit-cancel',
  templateUrl: './worker-visit-cancel.component.html',
  styleUrls: ['./worker-visit-cancel.component.css']
})
export class WorkerVisitCancelComponent {

  userId:string
  displayedColumns: string[] = ['id', 'worker',
    'userFirstName', 'userLastName', 'startTime',
    'visitTypeEnum', 'address', 'actions'];
  constructor(
    private userService: UserApiService,

  ) { }

  chooseUserId(userId: string) {
    this.userId = userId;

  }
}
