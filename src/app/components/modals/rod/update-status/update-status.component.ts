import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdministrationService } from 'src/app/shared/services/administration.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-update-status',
    templateUrl: './update-status.component.html',
    styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {
    @Input() data;
    @Input() proceed;
    @Input() rods = [];
    @Input() bulkStatus;
    @Input() type: string = 'single';
    @Output() response: EventEmitter<any> = new EventEmitter();
    notify = [];
    reason: string = '';
    notifyStatus = [
        'On Hold',
        'Withdrawn',
        'Off Hold',
    ];
    attachmentStatus = [
        'To Factory'
    ];
    reasonStatus = [
        'On Hold',
        'Withdrawn',
        'Off Hold',
    ];
    dueDateStatus = [
        'To Factory'
    ];
    scheduleRefStatus = [
        'To Factory'
    ];
    dueDate = null;
    scheduleRef = '';
    formData = new FormData();
    attachments = [];
    constructor(private _rod: RodService, private helper: GlobalHelper, private _admin: AdministrationService, private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.scheduleRef = this.data.model[0] ? this.data.model[0].schedule_ref : '';
        this.dueDate = this.data.model[0] ? new Date(this.data.model[0].due_date) : '';
        this.getRoles();
    }

    getRoles() {
        if (this.notifyStatus.includes(this.data.to)) {
            this._rod.getRolesListing().subscribe(res => {
                res.data.forEach(role => {
                    this.notify.push({
                        id: role.id,
                        name: role.title,
                        status: false
                    });
                });
            });
        }
    }
    cancel() {
        this.response.emit({ success: false, data: this.data.model[0] });
    }

    updateStatus() {
        if (!this.validateForm()) {
            return;
        }
        this.formData.set('id', this.data.model[0].id);
        this.formData.delete('notify[]');
        this.notify.forEach(element => {
            if (element.status)
                this.formData.append('notify[]', element.id);
        })
        this.formData.set('reason', this.reason);
        this.formData.set('on_hold', (this.data.hold ? '1' : '0'));
        this.formData.set('status', this.data.status);
        this.formData.set('proceed', this.proceed);
        if (this.dueDate) {
            this.formData.set('due_date', this.datePipe.transform(this.dueDate, 'YYYY-MM-dd'));
        }
        if (this.scheduleRef) {
            this.formData.set('schedule_ref', this.scheduleRef);
        }
        this._rod.updateOrderStatus(this.formData).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        });
    }

    addAttachment(event) {
        for (let index = 0; index < event.target.files.length; index++) {
            const element = event.target.files[index];
            this.formData.append('attachment[]', element, element.name);
            if (this.attachments.find(x => x.name == element.name) == undefined) {
                this.attachments.push(element);
            }
        }
    }

    removeAttachment(index) {
        this.formData.delete('attachment[]');
        this.attachments.splice(index, 1);
        this.attachments.forEach(element => {
            this.formData.append('attachment[]', element, element.name);
        })
    }

    updateBulk() {
        this.formData.delete('id[]');
        this.data.model.forEach(element => {
            this.formData.append('id[]', element.id);
        })
        this.notify.forEach(element => {
            if (element.status)
                this.formData.append('notify[]', element.id);
        })
        this.formData.set('reason', this.reason);
        this.formData.set('on_hold', (this.data.hold ? '1' : '0'));
        this.formData.set('status', this.data.status);
        if (this.dueDate) {
            this.formData.set('due_date', this.datePipe.transform(this.dueDate, 'YYYY-MM-dd'));
        }
        if (this.scheduleRef) {
            this.formData.set('schedule_ref', this.scheduleRef);
        }
        this._rod.bulkStatusUpdate(this.formData).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        });
    }

    validateForm() {
        if (this.dueDateStatus.includes(this.data.to) && !this.dueDate) {
            this.helper.toastError('Please select due date');
            return false;
        }
        return true;
    }

}
