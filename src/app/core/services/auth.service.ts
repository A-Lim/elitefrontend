import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AbilityBuilder, Ability } from '@casl/ability';

import { API_BASE_URL, API_VERSION } from 'app/configs/app.config';
import { User } from 'app/modules/users/models/user.model';
import { TokenData } from 'app/shared/models/responses/tokendata.model';
import { LoginData } from 'app/shared/models/responses/logindata.model';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';

import { LoginVm } from 'app/modules/auth/models/login.model.vm';
import { ProfileVm } from 'app/modules/profile/models/profile.model.vm';
import { ForgotPasswordVm } from 'app/modules/auth/models/forgotpassword.model.vm';
import { RegisterVm } from 'app/modules/auth/models/register.model.vm';
import { ResetPasswordVm } from 'app/modules/auth/models/resetpassword.model.vm';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _url = `${API_BASE_URL}/api/${API_VERSION}`;
  private _accessToken: string;
  private _headers = new HttpHeaders().set('X-Skip-Interceptor', '');
  // private _refreshToken: string;

  private _isAuthenticatedBS = new BehaviorSubject<boolean>(false);
  private _userBS = new BehaviorSubject<User>(null);

  public isAuthenticated$ = this._isAuthenticatedBS.asObservable();
  public user$ = this._userBS.asObservable();

  constructor(private http: HttpClient, private route: ActivatedRoute, private ability: Ability) { }

  get accessToken(): string {
    return this._accessToken;
  }

  // get refreshToken(): string {
  //   return this._refreshToken;
  // }

  // refreshAuthToken() {
  //   const data = { refreshToken: this.refreshToken };
  //   return this.http.post<ResponseResult<TokenData>>(`${this._url}/token/refresh` , data)
  //     .pipe(
  //       tap(response => {
  //         const tokenData = response.data;
  //         this._accessToken = tokenData.accessToken;
  //         this._refreshToken = tokenData.refreshToken;
  //         this._saveAuthData(tokenData.accessToken, tokenData.refreshToken, tokenData.expiresIn);
  //       })
  //     );
  // }

  login(data: LoginVm) {
    return this.http.post<ResponseResult<LoginData>>(`${this._url}/login` , data, { headers: this._headers })
      .pipe(tap(response => this._handleLoginData(response.data)));
  }

  register(data: RegisterVm) {
    return this.http.post<any>(`${this._url}/register` , data, { headers: this._headers });
  }

  forgotPassword(data: ForgotPasswordVm) {
    return this.http.post<ResponseResult<undefined>>(`${this._url}/forgot-password`, data, { headers: this._headers });
  }

  logout() {
    return this.http.post<ResponseResult<undefined>>(`${this._url}/logout`, null)
      .pipe(tap(_ => this.reset()));
  }

  resetPassword(data: ResetPasswordVm) {
    return this.http.post<ResponseResult<undefined>>(`${this._url}/reset-password`, data, { headers: this._headers });
  }

  getProfile() {
    return this.http.get<ResponseResult<User>>(`${this._url}/profile`);
  }

  updateProfile(data: ProfileVm) {
    // remove oldPassword with empty string
    if (data.oldPassword === '')
      delete data.oldPassword;
      
    return this.http.patch<ResponseResult<User>>(`${this._url}/profile` , data)
      .pipe(
        tap(response => {
          this._userBS.next(response.data);
          // update local storage data
          this._saveUserData(response.data);
        })
      );
  }

  // authenticate user if token is found in localstorage
  autoAuthUser() {
    const authData = this._getLocalData();
    // if no data in localstorage, exit function
    if (!authData)
      return;

    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this._accessToken = authData.accessToken;
      // this._refreshToken = authData.refreshToken;

      this._defineAbilities(authData.permissions);
      
      this._isAuthenticatedBS.next(true);
      this._userBS.next(authData.user);
    }
  }

  isAuthenticated(): boolean {
    return this._isAuthenticatedBS.getValue();
  }

  reset() {
    this._accessToken = null;
    // this._refreshToken = null;

    this._isAuthenticatedBS.next(false);
    this._userBS.next(null);

    localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
  }

  private _handleLoginData(data: LoginData) {
    this._accessToken = data.accessToken;
    // this._refreshToken = data.refreshToken;

    // this._saveAuthData(data.accessToken, data.refreshToken, data.expiresIn);
    this._saveAuthData(data.accessToken, data.expiresIn);
    this._saveUserData(data.user);
    this._savePermissions(data.permissions);
    this._defineAbilities(data.permissions);

    this._isAuthenticatedBS.next(true);
    this._userBS.next(data.user);
  }

  private _defineAbilities(permissions: string[]) {
    const { can, rules } = new AbilityBuilder<Ability>(Ability);
    
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i].split('.');
      const module = permission[0];
      const action = permission[1];

      can(action, module);
    }
    this.ability.update(rules);
  }

  private _savePermissions(permissions: string[]) {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  // private _saveAuthData(accessToken: string, refreshToken: string, expiresIn: number) {
  private _saveAuthData(accessToken: string, expiresIn: number) {
    // calculate expiration date time
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    
    localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private _saveUserData(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private _getLocalData() {
    const accessToken = localStorage.getItem('accessToken');
    // const refreshToken = localStorage.getItem('refreshToken');
    const expirationDate = localStorage.getItem('expiration');
    const user = JSON.parse(localStorage.getItem('user'));
    const permissions = JSON.parse(localStorage.getItem('permissions'));

    return {
      accessToken,
      // refreshToken,
      expirationDate: new Date(expirationDate),
      user,
      permissions,
    };
  }
}