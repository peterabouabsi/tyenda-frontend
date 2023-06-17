import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';

//Constants
import { Constants } from '../Models/constants.model';

//Forms
import { RefreshTokenForm } from '../Models/Forms/RefreshTokenForm.form';

//Services
import { GlobalService } from './../Services/Global/global.service';
import { AuthenticationService } from '../../Pages/authentication/Services/authentication.service';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor(private globalService: GlobalService,
              private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let session = this.globalService.getStorage(Constants.STORAGE_SESSION);
    let accessToken: string = "";
    let refreshToken: string = "";

    if(session){
      accessToken = session.accessToken;
      refreshToken = session.refreshToken;
    }

    if(accessToken){
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+accessToken
        }
      })
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
              let refreshTokenForm: RefreshTokenForm = {
                accessToken: accessToken,
                refreshToken: refreshToken
              };
              return this.authenticationService.refreshToken(refreshTokenForm).pipe(
                  mergeMap((response: any) => {
                    let newAccessToken = "";
                    if(!response.error){
                      this.globalService.setStorage(Constants.STORAGE_SESSION, response);
                      newAccessToken = response.accessToken;
                    }
                    const clonedRequest = request.clone({
                      setHeaders: {
                          Authorization: 'Bearer ' + newAccessToken
                      }
                  });
                  return next.handle(clonedRequest);

                    })
              );
          }
          return throwError(error);
      })
    );

  }
}
