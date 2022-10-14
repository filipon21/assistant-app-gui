import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Visit} from "./Visit";

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private visitSource = new BehaviorSubject<Visit>(new Visit());
  public currentVisit = this.visitSource.asObservable();

  setTemplate(visit: any) {
    visit = new Visit(
      visit.id,
      visit.visitStatusEnum,
      visit.visitTypeEnum
    );


    this.visitSource.next(visit);
    return visit;
  }
}
