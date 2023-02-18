import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';
import { AuthenticationService } from './authentication.service';
import { GlobalHelper } from './globalHelper';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userObjSubject: BehaviorSubject<any>;
    currentUser: Observable<any>;
    userPermissionObjSubject: BehaviorSubject<any>;
    permissions: Observable<any>;
    permissionsObj = {};
    constructor(private router: Router, private _authentication: AuthenticationService, private helper: GlobalHelper) {
        this.userObjSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userObj')));
        this.currentUser = this.userObjSubject.asObservable();
        this.userPermissionObjSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('permissions')));
        this.permissions = this.userPermissionObjSubject.asObservable();
        this.permissionArrayToObj()
    }

    public get currentUserValue(): any {
        return this.userObjSubject.value;
    }

    public get currentUserPermissions(): any {
        return this.userPermissionObjSubject.value;
    }

    storeUserData(token: string | null, userObj: any): void {
        localStorage.setItem('token', token);
        localStorage.setItem('userObj', JSON.stringify(userObj.user));
        localStorage.setItem('permissions', JSON.stringify(userObj.permissions));
        this.userPermissionObjSubject.next(userObj.permissions);
        this.userObjSubject.next(userObj.user);
        this.permissionArrayToObj()
        this.redirectToAllowedModule();
        return;
    }

    updateUserData(userObj: any): void {
        localStorage.setItem('userObj', JSON.stringify(userObj));
        this.userObjSubject.next(userObj);
        return;
    }

    updateUserPermissions(permissionsObj: any): void {
        localStorage.setItem('permissions', JSON.stringify(permissionsObj));
        this.userPermissionObjSubject.next(permissionsObj);
        this.permissionArrayToObj()
        this.redirectToAllowedModule();
        return;
    }

    checkPermissions(module, action) {
        return this.permissionsObj[module][action];
    }

    permissionArrayToObj() {
        this.currentUserPermissions?.forEach(element => {
            const code = element.code;
            this.permissionsObj[code] = element;
        });
    }

    redirectToAllowedModule() {
        for (let index = 0; index < this.currentUserPermissions.length; index++) {
            const element = this.currentUserPermissions[index];
            if (element.read) {
                this.router.navigate([element.module]);
                break;
            }
        }
    }

    updateNotificationDetails(params = {}) {
        return this._authentication.updateNotificationDetails(params);
    }
    logout() {
        let uuid = localStorage.getItem('uuid');
        this._authentication.logout({ uuid: uuid }).subscribe(res => {
            this.helper.clearLocalStorage();
            this.router.navigate(['/login']);
        })
    }
}
