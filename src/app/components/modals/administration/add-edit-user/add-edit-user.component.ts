import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdministrationService } from 'src/app/shared/services/administration.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-add-edit-user',
    templateUrl: './add-edit-user.component.html',
    styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
    @Input() user: any;
    @Input() type: string;
    @Input() roles: any;
    @Output() response: EventEmitter<any> = new EventEmitter();
    currentUser;
    constructor(private helper: GlobalHelper, private _administration: AdministrationService, private _auth: AuthService) {
        this.currentUser = this._auth.currentUserValue
    }

    ngOnInit(): void {
        console.log(this.user, this.type, this.roles);
        // this.user.role_id = 0
    }

    cancel() {
        this.response.emit({ success: false });
    }

    add() {
        if (this.validateForm()) {
            this._administration.addUser(this.user).subscribe(res => {
                this.helper.toastSuccess(res.message);
                this.response.emit(res);
            });
        }
    }

    deleteUser() {
        this._administration.deleteUser({ id: this.user.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, delete: true });
        })
    }

    update() {
        if (this.validateForm()) {
            this._administration.updateUser(this.user).subscribe(res => {
                this.helper.toastSuccess(res.message);
                this.response.emit(res);
            })
        }
    }

    validateForm() {
        if (!this.user.name?.length) {
            this.helper.toastError('Name is required');
            return false;
        }
        if (this.user.name.length < 3) {
            this.helper.toastError('Name must be of atleast 3 characters');
            return false;
        }

        if (!this.user.email?.length) {
            this.helper.toastError('Email is required');
            return false;
        }
        if (!this.helper.validateEmailAddress(this.user.email)) {
            this.helper.toastError('Please enter a valid email address');
            return false;
        }
        // if (this.type == 'add') {
        //     if (!this.user.password?.length) {
        //         this.helper.toastError('Password is required');
        //         return false;
        //     }
        //     if (this.user.password.length < 6) {
        //         this.helper.toastError('Password must be of atleast 6 characters');
        //         return false;
        //     }
        // }
        if (this.user.role_id == 0) {
            this.helper.toastError('Role is required');
            return false;
        }
        return true;
    }


}
