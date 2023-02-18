import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/shared/services/administration.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    settings: {
        blacklist_email_enabled: boolean,
        blacklist_email_recipients: Array<string>
    };
    sage: {
        is_live: boolean,
        staging_url: string,
        staging_token: string,
        live_url: string,
        live_token: string,
    };
    constructor(private _administration: AdministrationService, public _auth: AuthService, private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.getSageListing();
        this.getAdminSettings();
    }

    getAdminSettings() {
        this._administration.getSettings().subscribe(res => {
            this.settings = res.data;
        })
    }

    getSageListing() {
        this._administration.getSageListing().subscribe(res => {
            //ASSIGNING SELECTED PROPERTIES TO SAGE
            // this.sage = (({ is_live, staging_url, staging_token, live_url, live_token }) => (
            //     { is_live, staging_url, staging_token, live_url, live_token }))(res.data);
            this.sage = res.data;
        })
    }

    update() {
        this._administration.updateSettings(this.settings).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.settings = res.data
        });
    }

    updateSageListing() {
        if (this.validateSageUpdate()) {
            this._administration.updateSageListing(this.sage).subscribe(res => {
                this.helper.toastSuccess(res.message);
                this.sage = res.data
            });
        }
    }

    validateSageUpdate() {
        if (!this.sage.staging_url) {
            this.helper.toastError('Please Enter Staging URL.');
            return false;
        } else if (!this.sage.staging_token) {
            this.helper.toastError('Please Enter Staging Token.');
            return false;
        } else if (!this.sage.live_url) {
            this.helper.toastError('Please Enter Live URL.');
            return false;
        } else if (!this.sage.live_token) {
            this.helper.toastError('Please Enter Live Token.');
            return false;
        } else {
            return true;
        }
    }

    addRecipient(event) {
        console.log(event.keyCode);
        if (event.keyCode == 13) {
            this.settings.blacklist_email_recipients.push(event.target.value);
            event.target.value = '';
        }
    }

    removeRecipient(index) {
        this.settings.blacklist_email_recipients.splice(index, 1);
    }

}
