import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../classes/user/User";

/**
 * Klasa służąca do obsługi logiki związanej z komponentem do wyświetlania
 * danych o pacjencie
 */
@Component({
  selector: 'app-worker-user-details',
  templateUrl: './worker-user-details.component.html',
  styleUrls: ['./worker-user-details.component.css']
})
export class WorkerUserDetailsComponent {

  @Input()
  user: User

}
