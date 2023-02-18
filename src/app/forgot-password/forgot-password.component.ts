import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { GlobalHelper } from '../shared/services/globalHelper';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    email: string = '';
    validEmail: boolean = true;
    successMessage = '';
    constructor(private helper: GlobalHelper, private _authentication: AuthenticationService) { }

    ngOnInit(): void {
    }

    submitResetEmail() {
        this._authentication.forgotPasswordMail({ email: this.email }).subscribe(res => {
            this.successMessage = res.message;
            this.email = '';
            this.validEmail = true;
        });
    }

    validateEmail() {
        this.validEmail = this.helper.validateEmailAddress(this.email);
    }

}
