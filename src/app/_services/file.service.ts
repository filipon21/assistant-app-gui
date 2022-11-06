import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  PATH_OF_API = 'http://localhost:8080';
  URL = '/api/file';

  constructor(
    private httpClient: HttpClient) {
  }

  public downloadFile(code: string): Observable<Blob> {
    let uri = '/download/';
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.httpClient.get(this.PATH_OF_API + this.URL + uri + code,
      {responseType: 'blob'});
  }

  public uploadFile(visitId: string, formData: any): any {
    let uri = '/upload/';
    return this.httpClient.post(this.PATH_OF_API + this.URL + uri + visitId, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
