import {User} from "../user/User";

export class Prescription {
  id: string;
  code: string;
  fileCode: string;
  type: string;

  constructor(id?: string, code?: string, fileCode?: string, type?:string) {
    this.id = id;
    this.code = code;
    this.fileCode = fileCode;
    this.type = type;
  }
}

export class Exemption {
  id:string;
  startTime: string;
  endTime: string;
  // status: string;

  constructor(id?: string, startTime?:string, endTime?:string, status?:string) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    // this.status = status;
  }
}

export class Refferal {
  id:string;
  doctorSpecializationEnum: string;
  status: string;
  endTime: string;

  constructor(id?: string, doctorSpecializationEnum?:string, endTime?:string, status?:string) {
    this.id = id;
    this.doctorSpecializationEnum = doctorSpecializationEnum;
    this.endTime = endTime;
    this.status = status;
  }
}

export class Visit {
  id: string;
  visitStatusEnum: string;
  visitTypeEnum: string;
  startTime: string;
  address: string;
  endTime: string;
  recommendation: string;
  description: string;
  refferalId: string;
  refferals: Refferal[];
  prescription: Prescription;
  exemption: Exemption;
  users: User[]

  constructor(id?: string, visitStatusEnum?: string, visitTypeEnum?: string,
              startTime?: string, endTime?: string,
              users?: User[], address?: string, exemption?: Exemption, prescription?: Prescription,
              reccomendation?: string, refferals?:Refferal[]) {
    this.id = id;
    this.refferals = refferals;
    this.recommendation = reccomendation;
    this.exemption = exemption;
    this.prescription = prescription;
    this.visitStatusEnum = visitStatusEnum;
    this.visitTypeEnum = visitTypeEnum;
    this.startTime = startTime;
    this.endTime = endTime;
    this.users = users;
    this.address = address;
  }
}
