class Role {
  id: string;
  roleName: string;
  description: string;

  constructor(id?: string, roleName?: string, description?: string) {
    this.id = id;
    this.roleName = roleName;
    this.description = description;
  }
}

class Doctor {
  id: string;
  doctorSpecializationEnum;

  constructor(id?: string, doctorSpecializationEnum?: string) {
    this.id = id;
    this.doctorSpecializationEnum = doctorSpecializationEnum;
  }
}

class Assistant {
  id: string;
  assistantSpecializationEnum: string;

  constructor(id?: string, assistantSpecializationEnum?: string) {
    this.assistantSpecializationEnum = assistantSpecializationEnum;
    this.id = id;
  }
}

export class User {
  id: string;
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
  age: string;
  isOnline: boolean;
  birthday: Date;
  roles: Role[];
  doctor: Doctor;
  assistant: Assistant;

  constructor(id?: string, userName?: string, userFirstName?: string, userLastName?: string, phoneNumber?: string,
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
