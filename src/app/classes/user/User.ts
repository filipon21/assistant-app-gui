export class User {
  id: number;
  userName: string;
  userPassword: string;
  userFirstName: string;
  userLastName: string;
  phoneNumber: string;
  pesel: string;
  address: string;
  postalCode: string;
  voivodeship: string;
  country: string;
  town: string;
  isOnline: boolean;
  birthday: Date;

  constructor(id?: number, userName?: string, userFirstName?: string, userLastName?: string, phoneNumber?: string,
              pesel?: string, isOnline?: boolean, address?: string, postalCode?: string, voivodeship?: string,
              country?: string, town?:string, birthday?: Date, userPassword?: string) {
    this.id = id;
    this.userName = userName;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.phoneNumber = phoneNumber;
    this.pesel = pesel;
    this.isOnline = isOnline;
    this.address = address;
    this. postalCode = postalCode;
    this.voivodeship = voivodeship;
    this.country = country;
    this.town = town;
    this.userPassword = userPassword;
  }
}
