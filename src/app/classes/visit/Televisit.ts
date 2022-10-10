export class Televisit {
  id: string;
  televisitStatusEnum: string;
  televisitTypeEnum: string;

  constructor(id?: string, visitStatusEnum?: string, visitTypeEnum?: string) {
    this.id = id;
    this.televisitStatusEnum = visitStatusEnum;
    this.televisitTypeEnum = visitTypeEnum;
  }
}
