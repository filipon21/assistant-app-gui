import {FormGroup} from "@angular/forms";

export class SearchQueryUser {
  userFirstName: string;
  userLastName: string;
  phoneNumber: string;
  pesel: string;

  constructor(group: FormGroup) {
    this.userFirstName = group.get('userFirstName').value;
    this.userLastName = group.get('userLastName').value;
    this.phoneNumber = group.get('phoneNumber').value;
    this.pesel = group.get('pesel').value;

  }
}
