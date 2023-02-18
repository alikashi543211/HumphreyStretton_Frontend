import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    constructor(private http: HttpClient) {
    }

    login(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.login}`, params);
    }

    logout(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.logout}`, params);
    }

    forgotPasswordMail(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.forgotPasswordMail}`, params);
    }

    verifyToken(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.verifyPasswordToken}`, params);
    }

    resetPassword(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.resetPassword}`, params);
    }

    setupAccount(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.setupAccount}`, params);
    }

    skipPasswordUpdate(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.skipPasswordUpdate}`, params);
    }

    updateNotificationDetails(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateNoticationDetails}`, params);
    }
}
