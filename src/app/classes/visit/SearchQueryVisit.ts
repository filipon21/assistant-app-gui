import {FormGroup} from "@angular/forms";

export class SearchQueryVisit {
  visitStatusEnum?: string;
  visitTypeEnum?: string;
  startTime?: string;
  endTime?: string;
  address?: string;
  doctorId?: string;

  constructor(group: FormGroup) {
    this.visitStatusEnum = group?.get('visitStatusEnum')?.value;
    this.visitTypeEnum = group?.get('visitTypeEnum')?.value;
    this.startTime = group?.get('startTime')?.value;
    this.endTime = group?.get('endTime')?.value;
    this.address = group?.get('address')?.value;
    this.doctorId = group?.get('doctorId')?.value;
  }
}
