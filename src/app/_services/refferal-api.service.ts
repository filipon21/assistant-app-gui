import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../classes/Pagination";
import {Refferal} from "../classes/visit/Visit";

/**
 * Klasa służąca jako serwis do wysyłania zapytań HTTP na serwer dot. skierowań
 */
@Injectable({
  providedIn: 'root'
})
export class RefferalApiService {

  PATH_OF_API = 'http://localhost:8080';
  URL = '/api/refferal/';

  constructor(
    private httpClient: HttpClient) {
  }

  createRefferal(visitId: string, doctorSpecializationEnum:string) {
    return this.httpClient.post<any>(this.PATH_OF_API + this.URL+ visitId
      , null,{
        params: {
          doctorSpecializationEnum:doctorSpecializationEnum,
        }
      });
  }

  deleteRefferal(id: string) {
    return this.httpClient.delete(this.PATH_OF_API + this.URL+ id)
  }

  getAllUserRefferalsWithSpecialization(userId:string, doctorSpecializationEnum: string){
    const params = {doctorSpecializationEnum: doctorSpecializationEnum};
    return this.httpClient.get<Refferal[]>(this.PATH_OF_API + this.URL + "list/" + userId, {
      params: params
    })
  }

  getAllUserRefferals(userId:string){
    return this.httpClient.get<Refferal[]>(this.PATH_OF_API + this.URL + "list/" + userId)
  }

  getRefferal(refferalId: string) {
    return this.httpClient.get<Refferal>(this.PATH_OF_API + this.URL + refferalId)
  }
}
