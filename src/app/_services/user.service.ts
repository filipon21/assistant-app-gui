import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../classes/user/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject<User>(new User());
  public currentUser = this.userSource.asObservable();

  setUser(user: any) {
    user = new User(
      user.id,
    user.userName,
    user.userFirstName,
    user.userLastName,
    user.phoneNumber,
    user.pesel,
    user.isOnline,
    user.address,
    user.postalCode,
    user.voivodeship,
    user.country,
    user.userPassword
    );

    this.userSource.next(user);
    return user;
  }

}
