import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './services/auth-service/auth.service';
import {catchError, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  insertToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.auth.getToken();
    if (
      token && !request.url.endsWith('users/') &&
      !request.url.endsWith('api-token-auth/') &&
      !request.url.endsWith('api-token-refresh/')
    ) {
      return this.auth.refreshToken({token: this.auth.getToken()})
        .pipe(switchMap((response: any) => {
          const refreshedToken = response.token;
          this.auth.saveToken(refreshedToken);
          const headers = {
            Authorization: `JWT ${refreshedToken}`
          };
          request = request.clone({setHeaders: headers});
          return next.handle(request);
        }));
    }

    return next.handle(request);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.insertToken(request, next)
      .pipe(
        catchError(
          error => {
            if (
              error.status == 401 || error.status == 400 && request.url.endsWith('api-token-refresh/')
            ) {
              this.router.navigateByUrl('/auth/login');
            } else {
              return throwError(error);
            }
          }
        )
      );
  }
}
