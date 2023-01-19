import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

/**
 * Klasa służąca jako serwis do wysyłania zapytań HTTP na serwer dot. zwolnień
 */
@Injectable({
  providedIn: 'root'
})
export class ExemptionApiService {

  PATH_OF_API = 'http://localhost:8080';
  URL = '/api/exemption/';

  constructor(
    private httpClient: HttpClient) {
  }

  createExemption(visitId: string, startTime: string, endTime: string) {
    return this.httpClient.post<any>(this.PATH_OF_API + this.URL + visitId,
      {
        startTime: startTime,
        endTime: endTime
      });
  }
}
