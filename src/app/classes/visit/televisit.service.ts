import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Televisit} from "./Televisit";

@Injectable({
  providedIn: 'root'
})
export class TelevisitService {

  private visitSource = new BehaviorSubject<Televisit>(new Televisit());
  public currentVisit = this.visitSource.asObservable();

  setTemplate(visit: any) {
    visit = new Televisit(
      visit.id,
      visit.visitStatusEnum,
      visit.visitTypeEnum
    );


    this.visitSource.next(visit);
    return visit;
  }
}
