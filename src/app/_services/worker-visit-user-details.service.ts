import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkerVisitUserDetailsService {

  private approvalStageMessage = new BehaviorSubject(null);
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  constructor() {

  }
  updateApprovalMessage(message: string) {
    this.approvalStageMessage.next(message)
  }
}
