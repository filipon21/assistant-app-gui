import { Injectable } from '@angular/core';

/**
 * Klasa służąca jako serwis do zapisywania w pamięci przeglądarki roli aktualnego użytkownika, tokenu, id itd.
 */
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public setId(id: number) {
    localStorage.setItem('userId', JSON.stringify(id));
  }

  public getId(): string {
    return localStorage.getItem('userId');
  }

  setName(name: string) {
    localStorage.setItem('name', name);
  }

  public getName(): string{
    return localStorage.getItem('name');
  }
}
