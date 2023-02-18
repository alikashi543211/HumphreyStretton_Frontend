/// <reference types="chrome"/>
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
// <reference types="chrome/chrome-app"/>
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { AddJobNotesComponent } from '../modals/rod/add-job-notes/add-job-notes.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {
    
    user: any;
    showSoundTooltip = false;
    showProfileDropdown = false;
    clickCount = 0;
    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        windowClass: "modal-roles"
    };
    constructor(private renderer: Renderer2, private helper: GlobalHelper, public _firebase: FirebaseService, private router: Router, private _auth: AuthService, private _modal: NgbModal) {
        this.user = JSON.parse(localStorage.getItem('userObj'));
        this.renderer.listen('window', 'click',(e:Event)=>{
            this.showProfileDropdown = true;
            this.profileClick();
        });
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

    viewNotification(notification) {
        let not = notification.payload.val();
        if (not.type == 'order') {
            this.router.navigate(
                ['/rod'],
                {
                    queryParams: {
                        work_number: not.data.work_number
                    }
                }
            );
        } else if (not.type == 'note') {
            this.modalConfig.windowClass = "modal-roles job-notes-modal"
            const jobNoteModal = this._modal.open(AddJobNotesComponent, this.modalConfig);
            jobNoteModal.componentInstance.orderId = not.data.id
            jobNoteModal.componentInstance.response.subscribe(res => {

                jobNoteModal.dismiss();
                this.modalConfig.windowClass = "modal-roles"
            });
        }
        this._firebase.readNotification(notification);
    }

    soundButton(elRef) {
        if (this.getBrowserName() == 'chrome') {
            this.helper.detectExtensionInChrome(elRef);
            this.showSoundTooltip = true;
        } else if (this.getBrowserName() == 'firefox') {
            this.showSoundTooltip = true;
        }
        setTimeout(() => {
            this.showSoundTooltip = false;
        }, 5000);
    }

    nToolTip(_url?: string): void {
        if (_url) {
            window.open(_url, '_blank');
        }
    }

    profileClick() {
        if(this.showProfileDropdown) {
            document.getElementById("subject").classList.remove('active');
        }else if(this.clickCount > 0) {
            document.getElementById("subject").classList.add('active');
        }
        this.clickCount = 1;
        this.showProfileDropdown = !this.showProfileDropdown;
    }

    getBrowserName() {
        const agent = window.navigator.userAgent.toLowerCase()
        switch (true) {
            case agent.indexOf('edge') > -1:
                return 'edge';
            case agent.indexOf('opr') > -1 && !!(<any>window).opr:
                return 'opera';
            case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
                return 'chrome';
            case agent.indexOf('trident') > -1:
                return 'ie';
            case agent.indexOf('firefox') > -1:
                return 'firefox';
            case agent.indexOf('safari') > -1:
                return 'safari';
            default:
                return 'other';
        }
    }

}
