import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class AdministrationService {


    constructor(private http: HttpClient) {
    }

    // Users
    usersListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getUsersList}`, params);
    }

    addUser(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.addUser}`, params);
    }

    deleteUser(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deleteUser}`, params);
    }

    updateUser(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateUser}`, params);
    }


    // Roles
    rolesListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getRolesList}`, params);
    }

    addRole(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.addRole}`, params);
    }

    deleteRole(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deleteRole}`, params);
    }

    updateRole(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateRole}`, params);
    }

    getPermissionsList(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl + urls.getPermissionsList}`);
    }

    // Admin Settings
    getSettings(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl + urls.getAdminSettings}`);
    }
    getSageListing(): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getSageListing}`, {});
    }
    updateSettings(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateAdminSettings}`, params);
    }
    updateSageListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateSageListing}`, params);
    }
}
