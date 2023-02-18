import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    step = 0;
    isLoading: boolean = true;
    tokenVerified: boolean = true;
    updatePassword = {
        verification_code: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
    invalidConfirmPassword: boolean = false;
    constructor(private helper: GlobalHelper, private _authentication: AuthenticationService, private _auth: AuthService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        this.verifyToken()
    }

    verifyToken() {
        this.route.queryParams.subscribe(params => {
            if (params.token) {
                this.updatePassword.verification_code = params.token;
                this._authentication.verifyToken({ verification_code: params.token }).subscribe(res => {
                    this.updatePassword.email = res.data.email
                    this.isLoading = false;
                    this.step = 1;
                }, () => {
                    this.isLoading = false;
                    this.tokenVerified = false;
                    console.log(this.tokenVerified, this.isLoading);
                });
            } else this.helper.toastError('verification token is missing');
        });
    }

    resetPassword() {
        console.log(this.updatePassword);
        this._authentication.resetPassword(this.updatePassword).subscribe(res => {
            this._auth.storeUserData(res.data.access_token, res.data.user);
        });
    }

    passwordMismatch() {
        this.invalidConfirmPassword = this.updatePassword.password != this.updatePassword.password_confirmation;
    }



}
