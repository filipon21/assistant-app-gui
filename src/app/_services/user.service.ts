import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserAuthService} from './user-auth.service';
import {Pagination} from "../classes/Pagination";
import {Observable} from "rxjs";
import {SearchQueryUser} from "../classes/user/SearchQueryUser";
import {Televisit} from "../classes/visit/Televisit";
import {User} from "../classes/user/User";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080';
  URL = '/api/user';
  URL_VISIT = '/api/visit'

  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {
  }

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }

  getAssistantList(pagination: Pagination): Observable<any> {
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL + "/assistant", {
      params: {
        pageNumber: pagination.page.toString(),
        pageSize: pagination.size.toString(),
        sortParameter: pagination.sortParam,
        sortDirection: pagination.sortDir
      }
    });
  }

  getAssistantListWithFiltering(pagination: Pagination, searchQuery: SearchQueryUser) {
    const params = {
      pageNumber: pagination.page.toString(),
      pageSize: pagination.size.toString(),
      sortParameter: pagination.sortParam,
      sortDirection: pagination.sortDir,
      userFirstName: searchQuery.userFirstName,
      userLastName: searchQuery.userLastName,
      phoneNumber: searchQuery.phoneNumber,
      isOnline: searchQuery.isOnline
    };
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL + "/assistant", {
      params: params
    });
  }

  setIsOnline(isOnline: string, id: number) {
    return this.httpclient.patch<any>(this.PATH_OF_API + this.URL + "/" + id + "/online",null,{
      params: {
        isOnline: isOnline
      }
    });
  }


  createVisit(assistantId: any, userId: any, type: string) {
    return this.httpclient.post<Televisit>(this.PATH_OF_API + this.URL_VISIT + '/' + userId + '/' + assistantId, {
      televisitTypeEnum: type,
    });
  }

  getUserVisit(userId: any) {
    return this.httpclient.get<Televisit[]>(this.PATH_OF_API + this.URL_VISIT + '/list/'  + userId);
  }

  getVisit(id: string) {
    return this.httpclient.get<Televisit>(this.PATH_OF_API + this.URL_VISIT + '/' + id);
  }

  getUser(id: string) {
    return this.httpclient.get<User>(this.PATH_OF_API + this.URL + '/' + id);
  }
}
