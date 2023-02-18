import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { RodService } from 'src/app/shared/services/rod.service';
import { ViewProductionScheduleComponent } from '../view-production-schedule/view-production-schedule.component';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
    @Input() rod;
    @Output() response: EventEmitter<any> = new EventEmitter();
    notificationSubscription: Subscription;
    jobNotes = [];
    jobDetail = null;
    showPage = false;
    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        windowClass: "modal-roles"
    };
    constructor(private _rod: RodService, private _modal: NgbModal, public _auth: AuthService, private helper: GlobalHelper) {
    }

    ngOnInit(): void {
        console.log('timeline rod', this.rod)
        this.getTimeLine();
        this.getNotifications();
    }

    getTimeLine() {
        this._rod.getTimeline({ work_order_id: this.rod.id, timeline: true }).subscribe(res => {
            console.log(res.data);
            this.getOrder();
            this.jobNotes = res.data;
        });
    }

    getOrder() {
        this._rod.getWorkOrder({ id: this.rod.id }).subscribe(res => {
            // console.log('work order', res.data);
            this.rod = res.data;
            this.showPage = true;
        });
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            // console.log('timeline notifications called', res);
            if(res && res['component'] == 'timeline' && res['body']) {
                let obj = JSON.parse(res['body']);
                if(obj.id == this.rod.id) {
                    // console.log('timeline is updating', res);
                    this.getTimeLine();
                }
            }
        })
    }

    close() {
        this.response.emit({ success: false, data: this.rod });
    }

    viewDeliveryNotes() {
        this.response.emit({ success: true });
    }

    viewProductionSchedule(type = 1) {
        const productionModal = this._modal.open(ViewProductionScheduleComponent, this.modalConfig);
        productionModal.componentInstance.data = this.rod;
        productionModal.componentInstance.fileType = type;
        productionModal.componentInstance.type = 'view';
        productionModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.rod = res.data
            }
            productionModal.dismiss();
        });
    }

    addProductionSchedule(type = 1) {
        const productionModal = this._modal.open(ViewProductionScheduleComponent, this.modalConfig);
        productionModal.componentInstance.data = this.rod;
        productionModal.componentInstance.fileType = type;
        productionModal.componentInstance.type = 'add';
        productionModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.rod = res.data;
            }
            productionModal.dismiss();
        });
    }
    deleteAttachment(attach, type = 'attachments') {
        this._rod.removeProductionSchedule({ id: attach.id }).subscribe(res => {
            this.rod[type] = [];
            this.helper.toastSuccess(res.message);
        });
    }

    showJobNoteDetails(val) {
        this.jobDetail = val;
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}   
