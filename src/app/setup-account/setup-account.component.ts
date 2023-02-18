import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { GlobalHelper } from '../shared/services/globalHelper';

@Component({
    selector: 'app-setup-account',
    templateUrl: './setup-account.component.html',
    styleUrls: ['./setup-account.component.css']
})
export class SetupAccountComponent implements OnInit {
    step = 0;
    isLoading: boolean = true;
    tokenVerified: boolean = true;
    updatePasswordObj = {
        verification_code: '',
        password: '',
        password_confirmation: '',
        skip: false
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
                this.updatePasswordObj.verification_code = params.token;
                this._authentication.setupAccount({ verification_code: params.token }).subscribe(res => {
                    this.isLoading = false;
                    this.step = 1;
                }, () => {
                    this.isLoading = false;
                    this.tokenVerified = false;
                });
            } else this.helper.toastError('verification token is missing');
        });
    }

    updatePassword() {
        this._authentication.skipPasswordUpdate(this.updatePasswordObj).subscribe(res => {
            this._auth.storeUserData(res.data.access_token, res.data.user);
        });
    }

    skipPassword() {
        this.updatePasswordObj.skip = true;
        this._authentication.skipPasswordUpdate(this.updatePasswordObj).subscribe(res => {
            this._auth.storeUserData(res.data.access_token, res.data.user);
        });
    }

    passwordMismatch() {
        this.invalidConfirmPassword = this.updatePasswordObj.password != this.updatePasswordObj.password_confirmation;
    }



}
