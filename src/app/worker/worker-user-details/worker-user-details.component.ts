import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../classes/user/User";

@Component({
  selector: 'app-worker-user-details',
  templateUrl: './worker-user-details.component.html',
  styleUrls: ['./worker-user-details.component.css']
})
export class WorkerUserDetailsComponent implements OnInit {

  @Input()
  user: User

  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
  }

}
