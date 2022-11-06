import {Component, OnInit} from '@angular/core';

import {UserAuthService} from "../../_services/user-auth.service";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit{

  userId: string;
  biggerFont:boolean;
  displayedColumns: string[] = ['id', 'worker',
    'userFirstName', 'userLastName', 'startTime', 'endTime',
    'visitTypeEnum', 'address', 'visitStatusEnum', 'actions'];

  constructor(private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.biggerFont = true;
    this.userId = this.userAuthService.getId();
  }


}
