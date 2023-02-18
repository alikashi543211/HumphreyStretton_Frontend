import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit {

    user: any;
    constructor(private helper: GlobalHelper, public router: Router, public _auth: AuthService) {
        this.user = JSON.parse(localStorage.getItem('userObj'));
        this._auth.currentUser.subscribe(res => {
            if (res !== true) {
                this.user = res;
            }
        })
    }

    ngOnInit(): void {
    }

    logout() {
        this._auth.logout();
    }
}
