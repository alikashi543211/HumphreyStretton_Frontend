import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditRolesComponent } from 'src/app/components/modals/administration/add-edit-roles/add-edit-roles.component';
import { AdministrationService } from 'src/app/shared/services/administration.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
    roles: any = [];
    search: string = '';
    notificationSubscription: Subscription;
    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        windowClass: "modal-roles"
    };
    constructor(private ref: ChangeDetectorRef, private _administration: AdministrationService, private _modal: NgbModal, public _auth: AuthService, private helper: GlobalHelper,) { }

    ngOnInit(): void {
        this.getRoles();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            // console.log('roles before', this.roles, JSON.parse(res['body']));
            let isCreated = this.helper.checkNotification('roles', 'administration', this.roles, res);
            if(isCreated == true) {
                this.getRoles();
            }else {this.ref.detectChanges();}
        })
    }

    getRoles() {
        this._administration.rolesListing({ search: this.search }).subscribe(res => {
            this.roles = res.data;
            console.log('roles', this.roles);
        });
    }


    roleAction(role: any, event: any, index: number) {
        const modal = this._modal.open(AddEditRolesComponent, this.modalConfig);
        modal.componentInstance.role = { ...role };
        modal.componentInstance.type = event;
        modal.componentInstance.response.subscribe((res: any) => {
            if (res.success) {
                this.getRoles();
            }
            modal.close();
        });
    }

    addRole() {
        const modal = this._modal.open(AddEditRolesComponent, this.modalConfig);
        modal.componentInstance.role = {};
        modal.componentInstance.type = 'add';
        modal.componentInstance.response.subscribe((res: any) => {
            if (res.success) {
                this.getRoles();
            }
            modal.close();
        });
    }


    searchRole() {
        if (this.search.length >= 3 || this.search.length == 0) {
            this.getRoles();
        }
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
