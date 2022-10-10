export class User {
  id: number;
  userName: string;
  userFirstName: string;
  userLastName: string;
  phoneNumber: string;
  pesel: string;
  isOnline: boolean;

  constructor(id?: number, userName?: string, userFirstName?: string, userLastName?: string, phoneNumber?: string,
              pesel?: string, isOnline?: boolean) {
    this.id = id;
    this.userName = userName;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.phoneNumber = phoneNumber;
    this.pesel = pesel;
    this.isOnline = isOnline;
  }
}
