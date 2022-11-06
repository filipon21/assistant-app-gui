import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Visit} from "./Visit";
import {VisitDetails} from "./VisitDetails";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private datePipe:DatePipe) {
  }


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

  public dataArrayFilter(array: Visit[], ifWorker?: boolean) {
    const visitTableList = [];
    if (ifWorker) {
      for (var visit of array) {
        const user = visit.users.filter((obj) => {
          return obj.assistant === null && obj.doctor === null;
        });
        let visitDetails = new VisitDetails(visit.id, null, user[0]?.userFirstName,
          user[0]?.userLastName, this.datePipe.transform(visit.startTime,
            "yyyy-MM-dd HH:mm"), null, visit.visitTypeEnum,
          visit.address, visit.visitStatusEnum, user[0]?.id)
       visitTableList.push(visitDetails);
      }
    } else {
      for (var visit of array) {
        let worker;
        const user = visit.users.filter((obj) => {
          return obj.assistant !== null || obj.doctor !== null;
        });
        if (user[0].assistant) {
          worker = 'ASSISTANT';

        } else {
          worker = user[0]?.doctor?.doctorSpecializationEnum;
        }
        let visitDetails = new VisitDetails(visit.id, worker, user[0]?.userFirstName,
          user[0]?.userLastName, this.datePipe.transform(visit.startTime,
            "yyyy-MM-dd HH:mm"), null, visit.visitTypeEnum,
          visit?.address, visit?.visitStatusEnum)
        visitTableList.push(visitDetails);
      }
    }
    return visitTableList;
  }
}
