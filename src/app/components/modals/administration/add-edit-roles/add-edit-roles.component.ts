import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdministrationService } from 'src/app/shared/services/administration.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-add-edit-roles',
    templateUrl: './add-edit-roles.component.html',
    styleUrls: ['./add-edit-roles.component.css']
})
export class AddEditRolesComponent implements OnInit {
    @Input() role: any;
    @Input() type: any;
    @Output() response: EventEmitter<any> = new EventEmitter();
    constructor(private helper: GlobalHelper, private _administration: AdministrationService) { }

    ngOnInit(): void {
        console.log('Role', this.role.permissions);
        if (localStorage.getItem('permissionsList')) {
            if (!this.role?.permissions) {
                this.role.permissions = JSON.parse(localStorage.getItem('permissionsList'))
            }
        } else {
            this._administration.getPermissionsList().subscribe(res => {
                this.role.permissions = res.data;
                localStorage.setItem('permissionsList', JSON.stringify(res.data));
            })
        }
    }

    cancel() {
        this.response.emit({ success: false });
    }

    add() {
        if (this.validateForm()) {
            this._administration.addRole(this.role).subscribe(res => {
                this.helper.toastSuccess(res.message);
                this.response.emit(res);
            });
        }
    }

    deleteRole() {
        this._administration.deleteRole({ id: this.role.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, delete: true });
        })
    }

    update() {
        if (this.validateForm()) {
            this._administration.updateRole(this.role).subscribe(res => {
                this.helper.toastSuccess(res.message);
                this.response.emit(res);
            })
        }
    }

    validateForm() {
        if (!this.role.title?.length) {
            this.helper.toastError('Role name is required');
            return false;
        }
        return true;
    }
}
