import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

/**
 * Klasa służąca jako serwis do wysyłania zapytań HTTP na serwer dot. zwolnień
 */
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
