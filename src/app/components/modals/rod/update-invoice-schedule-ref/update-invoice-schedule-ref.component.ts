import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-update-invoice-schedule-ref',
    templateUrl: './update-invoice-schedule-ref.component.html',
    styleUrls: ['./update-invoice-schedule-ref.component.css']
})
export class UpdateInvoiceScheduleRefComponent implements OnInit {
    @Input() type: string;
    @Output() response: EventEmitter<any> = new EventEmitter();
    scheduleRef: string;
    invoiceNo: string;
    constructor(private helper: GlobalHelper, private _rod: RodService) { }

    ngOnInit(): void {
    }

    UpdateInvoiceNo() {
        this.response.emit({ success: true, type: this.type, data: this.invoiceNo });
    }

    cancel() {
        this.response.emit({ success: false });
    }

    updateScheduleRef() {
        this.response.emit({ success: true, type: this.type, data: this.scheduleRef });
    }

}
