import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-delete-confirmation',
    templateUrl: './delete-confirmation.component.html',
    styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
    @Input() data;
    @Input() type = 'order';
    @Output() response: EventEmitter<any> = new EventEmitter();
    reason: string = '';
    constructor(private _rod: RodService, private _phonebook: PhonebookService, private helper: GlobalHelper, private _account: AccountService) { }

    ngOnInit(): void {
    }

    cancel() {
        this.response.emit({ success: false });
    }


    deleteOrder() {
        let obj = {
            id: this.data.id,
            reason: this.reason,
            on_hold: this.data.on_hold,
            status: 'Cancelled'
        }
        this._rod.updateOrderStatus(obj).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    deleteCustomer() {
        this._phonebook.deleteCustomer({ id: this.data.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    deleteSupplier() {
        this._phonebook.deleteSupplier({ id: this.data.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    deleteEmployee() {
        this._phonebook.deleteEmployee({ id: this.data.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    deleteFixedCost() {
        this._account.deleteFixedCost({ id: this.data.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }
    deleteAccountSaleOrder() {
        this._account.deleteSaleOrder({ id: this.data.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    accountPurchaseOrder() {
        this._account.deletePurchaseOrder({ id: this.data.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

}
