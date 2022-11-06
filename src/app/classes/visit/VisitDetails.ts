export class VisitDetails {
  id: string;
  worker: string;
  userFirstName: string;
  userLastName: string;
  startTime: string;
  endTime: string;
  visitTypeEnum: string;
  address: string;
  visitStatusEnum: string;
  userTableId: string;

  constructor(id?: string, worker?: string, userFirstName?: string, userLastName?: string,
              startTime?: string, endTime?: string, visitTypeEnum?: string, address?: string,
              visitStatusEnum?: string, userTableId?: string) {
    this.id = id;
    this.worker = worker;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.visitTypeEnum = visitTypeEnum;
    this.address = address;
    this.visitStatusEnum = visitStatusEnum;
    this.userTableId = userTableId;
  }

}
