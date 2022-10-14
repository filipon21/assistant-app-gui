export class Visit {
  id: string;
  visitStatusEnum: string;
  visitTypeEnum: string;
  startTime: Date;
  endTime: Date;

  constructor(id?: string, visitStatusEnum?: string, visitTypeEnum?: string, startTime?: Date, endTime?: Date) {
    this.id = id;
    this.visitStatusEnum = visitStatusEnum;
    this.visitTypeEnum = visitTypeEnum;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
