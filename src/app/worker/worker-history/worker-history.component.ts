import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../_services/user-auth.service";

/**
 * Klasa służąca do obsługi logiki związanej z komponentem do historii wizyt pracownika
 */
@Component({
  selector: 'app-worker-history',
  templateUrl: './worker-history.component.html',
  styleUrls: ['./worker-history.component.css']
})
export class WorkerHistoryComponent implements OnInit {

  userId: string;
  biggerFont:boolean;
  displayedColumns: string[] = ['id',
    'userFirstName', 'userLastName', 'startTime', 'endTime',
    'visitTypeEnum', 'address', 'visitStatusEnum', 'actions'];

  constructor(private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.biggerFont = true;
    this.userId = this.userAuthService.getId();
  }

}
