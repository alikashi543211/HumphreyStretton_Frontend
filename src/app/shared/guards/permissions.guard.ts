import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
    constructor(private _auth: AuthService, private toaster: ToastrService, private modalService: NgbModal) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.modalService.dismissAll();
        let permissions = this._auth.currentUserPermissions;
        this._auth.permissions.subscribe(res => {
            permissions = this._auth.currentUserPermissions;
        })
        let returnValue = true;
        if (permissions) {
            for (let i = 0; i < permissions.length; i++) {
                const x = permissions[i];
                if (next.routeConfig.path.toLocaleLowerCase() == 'settings') {
                    return true;
                    break;
                }
                if (x.module === next.routeConfig.path.toLocaleLowerCase() && x.read) {
                    returnValue = true;
                    // return true;
                    break;
                } else {

                    returnValue = false;
                    // return false;
                    // break;
                }

            }
            if (returnValue == false) {
                this.toaster.error('Sorry , you are not allowed to access this URL', 'Authentication');
                this._auth.redirectToAllowedModule();
            }
            return returnValue;
        } else {
            return false;
        }

    }

}