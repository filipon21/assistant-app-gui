import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../_services/user-auth.service";

@Component({
  selector: 'app-user-upcoming',
  templateUrl: './user-upcoming.component.html',
  styleUrls: ['./user-upcoming.component.css']
})
export class UserUpcomingComponent implements OnInit {

  userId: string;
  biggerFont:boolean;
  displayedColumns: string[] = ['id', 'worker',
    'userFirstName', 'userLastName', 'startTime',
    'visitTypeEnum', 'address', 'visitStatusEnum', 'actions'];

  constructor(private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.biggerFont = true;
    this.userId = this.userAuthService.getId();
  }

}
