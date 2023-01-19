import {FormGroup} from "@angular/forms";

export class SearchQueryAssistant {
  userFirstName: string;
  userLastName: string;
  phoneNumber: string;
  isOnline: string;

  constructor(group: FormGroup) {
    this.userFirstName = group.get('userFirstName').value;
    this.userLastName = group.get('userLastName').value;
    this.phoneNumber = group.get('phoneNumber').value;
    this.isOnline = group.get('isOnline').value;

  }
}
