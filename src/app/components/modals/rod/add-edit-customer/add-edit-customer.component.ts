import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';

@Component({
    selector: 'app-add-edit-customer',
    templateUrl: './add-edit-customer.component.html',
    styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {
    @Input() cus;
    @Input() type = 'add';
    @Output() response: EventEmitter<any> = new EventEmitter();
    customer = {
        name: '',
        email: '',
        phone_no: ''
    }
    constructor(private _phonebook: PhonebookService, private helper: GlobalHelper) { }

    ngOnInit(): void {
    }

    cancel() {
        this.response.emit({ success: false });
    }

    new() {
        this._phonebook.addCustomer(this.customer).subscribe(res => {
            this.helper.toastSuccess(res.message)
            this.response.emit({ success: true, data: res.data, new: true })
        })
    }

    edit() {
        this._phonebook.updateCustomer(this.cus).subscribe(res => {
            this.helper.toastSuccess(res.message)
            this.response.emit({ success: true, data: res.data })
        })
    }



}
