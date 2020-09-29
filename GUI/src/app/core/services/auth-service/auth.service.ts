import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../../shared/interfaces/user';
import {environment} from '../../../../environments/environment';
import {LoginResponse} from '../../../shared/interfaces/http-responses';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://127.0.0.1:8000/api/v2beta';
  public token: string;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  createNewUserData(formData: any) {
    return this.httpClient.post(this.apiUrl + '/users/', formData)
      .pipe(map((response) => new User()
        .deserialize(response)
      ));
  }

  loginUser(body): Observable<LoginResponse> {
    return this.httpClient.post(this.apiUrl + '/api-token-auth/', body)
      .pipe(map((response: LoginResponse) => {
        this.saveToken(response.token);
        return response;
      }));
  }

  refreshToken(body): Observable<object> {
    return this.httpClient.post(this.apiUrl + '/api-token-refresh/', body);
  }

  saveToken(token: string): void {
    localStorage.setItem(environment.tokenKeyName, token);
  }

  getToken(): string {
    return localStorage.getItem(environment.tokenKeyName);
  }

  purgeToken(): void {
    localStorage.removeItem(environment.tokenKeyName);
  }
}

