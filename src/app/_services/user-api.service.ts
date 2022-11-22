import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserAuthService} from './user-auth.service';
import {Pagination} from "../classes/Pagination";
import {Observable} from "rxjs";
import {SearchQueryAssistant} from "../classes/user/SearchQueryAssistant";
import {Visit} from "../classes/visit/Visit";
import {User} from "../classes/user/User";
import {SearchQueryVisit} from "../classes/visit/SearchQueryVisit";
import {SearchQueryUser} from "../classes/user/SearchQueryUser";

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
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
          }
        }
      }
    }
    return isMatch;
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

  getAssistantListWithFiltering(pagination: Pagination, searchQuery: SearchQueryAssistant) {
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

  getUserList(pagination: Pagination) {
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL + "/users", {
      params: {
        pageNumber: pagination.page.toString(),
        pageSize: pagination.size.toString(),
        sortParameter: pagination.sortParam,
        sortDirection: pagination.sortDir
      }
    });
  }

  getUserListWithFiltering(pagination: Pagination, searchQuery: SearchQueryUser) {
    const params = {
      pageNumber: pagination.page.toString(),
      pageSize: pagination.size.toString(),
      sortParameter: pagination.sortParam,
      sortDirection: pagination.sortDir,
      userFirstName: searchQuery.userFirstName,
      userLastName: searchQuery.userLastName,
      phoneNumber: searchQuery.phoneNumber,
      pesel: searchQuery.pesel
    };
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL + "/users", {
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


  createVisit(assistantId: any, userId: any, type: string, startTime: string, status: string) {
    return this.httpclient.post<Visit>(this.PATH_OF_API + this.URL_VISIT + '/' + userId + '/' + assistantId, {
      visitTypeEnum: type,
      startTime: startTime,
      visitStatusEnum: status,
    });
  }

  getUserTelevisit(userId: any) {
    return this.httpclient.get<Visit>(this.PATH_OF_API + this.URL_VISIT + '/online/'  + userId);
  }

  getVisit(id: string) {
    return this.httpclient.get<Visit>(this.PATH_OF_API + this.URL_VISIT + '/' + id);
  }

  getUser(id: string) {
    return this.httpclient.get<User>(this.PATH_OF_API + this.URL + '/' + id);
  }

  updateUser(user: User, id: string){
    return this.httpclient.patch<User>(this.PATH_OF_API + this.URL + '/' + id, {
      userName: user.userName,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      phoneNumber: user.phoneNumber,
      pesel: user.pesel,
      address: user.address,
      postalCode: user.postalCode,
      voivodeship: user.voivodeship,
      country: user.country,
      town: user.town
    })
  }

  register(user: User) {
    console.log(user)
    return this.httpclient.post<User>(this.PATH_OF_API + this.URL + '/' + "register", {
      userName: user.userName,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userPassword: user.userPassword,
      phoneNumber: user.phoneNumber,
      pesel: user.pesel,
      address: user.address,
      postalCode: user.postalCode,
      voivodeship: user.voivodeship,
      country: user.country,
      town: user.town,
      isActive: true,
      birthday: user.birthday
    }, {headers: this.requestHeader})
  }

  getUserVisitsWithFiltering(pagination: Pagination, searchQuery: SearchQueryVisit, userId) {
    const params = {
      pageNumber: pagination.page.toString(),
      pageSize: pagination.size.toString(),
      sortParameter: pagination.sortParam,
      sortDirection: pagination.sortDir,
      visitStatusEnum: searchQuery.visitStatusEnum,
      visitTypeEnum: searchQuery.visitTypeEnum,
      startTime: searchQuery.startTime,
      endTime: searchQuery.endTime,
      address: searchQuery.address,
      userId: userId
    };
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL_VISIT + "/list/history"
      , {
      params: params
    });
  }

  getVisitList(pagination: Pagination, userId) {
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL_VISIT+ "/list/history"
      , {
      params: {
        pageNumber: pagination.page.toString(),
        pageSize: pagination.size.toString(),
        sortParameter: pagination.sortParam,
        sortDirection: pagination.sortDir,
        userId: userId
      }
    });
  }

  getUserUpcomingVisitsWithFiltering(pagination: Pagination, searchQuery: SearchQueryVisit, userId: string) {
    const params = {
      pageNumber: pagination.page.toString(),
      pageSize: pagination.size.toString(),
      sortParameter: pagination.sortParam,
      sortDirection: pagination.sortDir,
      visitStatusEnum: searchQuery.visitStatusEnum,
      visitTypeEnum: searchQuery.visitTypeEnum,
      startTime: searchQuery.startTime,
      address: searchQuery.address,
      userId: userId
    };
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL_VISIT + "/list/upcoming"
      , {
        params: params
      });
  }

  getUpcomingVisitList(pagination: Pagination, userId: string) {
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL_VISIT+ "/list/upcoming"
      , {
        params: {
          pageNumber: pagination.page.toString(),
          pageSize: pagination.size.toString(),
          sortParameter: pagination.sortParam,
          sortDirection: pagination.sortDir,
          userId: userId
        }
      });
  }

  updateVisit(id:string, now:any, recommendation: string, description: string) {
    return this.httpclient.patch(this.PATH_OF_API + this.URL_VISIT+ "/" + id, {
      recommendation: recommendation,
      description: description,
      endTime: now,
      visitStatusEnum: "ENDED",
    })
  }

  getFreeVisitsWithFiltering(pagination: Pagination, searchQuery: SearchQueryVisit) {
    const params = {
      pageNumber: pagination.page.toString(),
      pageSize: pagination.size.toString(),
      sortParameter: pagination.sortParam,
      sortDirection: pagination.sortDir,
      visitStatusEnum: searchQuery.visitStatusEnum,
      visitTypeEnum: searchQuery.visitTypeEnum,
      startTime: searchQuery.startTime,
      address: searchQuery.address,
      doctorId: searchQuery.doctorId,
    };
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL_VISIT + "/list/free"
      , {
        params: params
      });
  }

  getFreeVisitList(pagination: Pagination) {
    return this.httpclient.get<any>(this.PATH_OF_API + this.URL_VISIT+ "/list/free"
      , {
        params: {
          pageNumber: pagination.page.toString(),
          pageSize: pagination.size.toString(),
          sortParameter: pagination.sortParam,
          sortDirection: pagination.sortDir,
        }
      });
  }


  addUserToVisit(userId: string, refferalId: any, visitId: any) {

    const params = {refferalId: refferalId}
     return this.httpclient.patch(this.PATH_OF_API + this.URL_VISIT + "/" + visitId + "/user/" + userId, null,
       {
       params: params
     })
  }

  addUserToVisitWithoutParams(userId: string, visitId: any) {
    return this.httpclient.patch(this.PATH_OF_API + this.URL_VISIT + "/" + visitId + "/user/"
      + userId, null)
  }

  cancelVisit(id, refferalId, userId: string) {
    let params = {};
    if (refferalId){
       params = {
        refferalId: refferalId
      }
    }

    return this.httpclient.delete(this.PATH_OF_API + this.URL_VISIT + "/" +
    id + "/user/" + userId, {
      params: params
    })
  }

  rejectVisit(id: string, now: any) {
    return this.httpclient.patch(this.PATH_OF_API + this.URL_VISIT+ "/" + id, {
      endTime: now,
      visitStatusEnum: "REJECTED",
    })
  }

  acceptVisit(id: string, chatLink?: string) {
    return this.httpclient.patch(this.PATH_OF_API + this.URL_VISIT+ "/" + id, {
      chatLink: chatLink ? chatLink : null,
      visitStatusEnum: "STARTED",
    })
  }
}
