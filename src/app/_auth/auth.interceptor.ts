import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { Injectable } from '@angular/core';

/**
 * Klasa służąca do sprawdzania tokena i interpretacji, czy jest zezwolona autoryzacja
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthService: UserAuthService,
              private router:Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
      catchError(
        (err:HttpErrorResponse) => {
          console.log(err.status);
          if(err.status === 401) {
            this.userAuthService.clear();
            this.router.navigate(['/login']);
          } else if(err.status === 403) {
            this.router.navigate(['/forbidden']);
          }
          alert("Coś poszło nie tak")
          return throwError("Something is wrong");
        }
      )
    );
  }


  /**
   * Metoda służąca do dodawania nagłówka z tokenem do requesta
   * @param request - request HTTP
   * @param token - JSON WEB TOKEN
   */
  private addToken(request:HttpRequest<any>, token:string) {
    return request.clone(
      {
        setHeaders: {
          Authorization : `Bearer ${token}`
        }
      }
    );
  }
}
