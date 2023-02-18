import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-view-production-schedule',
    templateUrl: './view-production-schedule.component.html',
    styleUrls: ['./view-production-schedule.component.css']
})
export class ViewProductionScheduleComponent implements OnInit {
    @Input() data;
    @Input() type = 'add';
    @Input() fileType; // 1 => PRODUCTION_SCHEDULE_ATTACHMENT, 2 => QUOTATION_ATTACHMENT, 3 => OTHER_ATTACHMENT
    @Output() response: EventEmitter<any> = new EventEmitter();
    formData = new FormData();
    attachments = [];
    constructor(private _rod: RodService, private helper: GlobalHelper, public _auth: AuthService) { }

    ngOnInit(): void {
    }

    UploadFiles() {
        this.formData.set('work_order_id', this.data.id);
        this.formData.set('type', this.fileType);
        this._rod.uploadProductionSchedule(this.formData).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        });
    }

    addAttachment(event) {
        for (let index = 0; index < event.target.files.length; index++) {
            const element = event.target.files[index];
            let validFiles = ['jpeg', 'jpg', 'png', 'pdf', 'csv', 'xlsx', 'xls', 'docx', 'doc', 'pptx', 'ppt'];
            let ext = element.name.split('.')[element.name.split('.').length - 1]
            if (!validFiles.includes(ext)) {
                this.helper.toastError(`Unsupported file .${ext}`);
                continue;
            } else if (element.size > 5000000) {
                this.helper.toastError(`Attachment must be less than 5MB`);
                continue;
            }
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
        });
    }

    deleteAttachment(attach, index, type = 'attachments') {
        this._rod.removeProductionSchedule({ id: attach.id }).subscribe(res => {
            this.data[type].splice(index, 1);
            this.helper.toastSuccess(res.message);
        });
    }
    cancel() {
        this.response.emit({ success: false, data: this.data });
    }

    dragFiles(event) {
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.formData.append('attachment[]', element, element.name);
            if (this.attachments.find(x => x.name == element.name) == undefined) {
                this.attachments.push(element);
            }
        }
    }
}
