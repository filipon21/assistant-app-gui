import { Component, OnInit } from '@angular/core';
import {UserApiService} from "../../_services/user-api.service";

@Component({
  selector: 'app-worker-visit-cancel',
  templateUrl: './worker-visit-cancel.component.html',
  styleUrls: ['./worker-visit-cancel.component.css']
})
export class WorkerVisitCancelComponent implements OnInit {

  userId:string
  displayedColumns: string[] = ['id', 'worker',
    'userFirstName', 'userLastName', 'startTime',
    'visitTypeEnum', 'address', 'actions'];
  constructor(
    private userService: UserApiService,

  ) { }

  ngOnInit(): void {
  }

  chooseUserId(userId: string) {
    this.userId = userId;

  }
}
