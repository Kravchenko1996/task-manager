import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./services/auth-service/auth.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    if (token) {
      const headers = {
        // 'Content-type': 'application/json',
        Authorization: `JWT ${token}`
      }
      request = request.clone({setHeaders: headers})
    }
    return next.handle(request);
  }
}
