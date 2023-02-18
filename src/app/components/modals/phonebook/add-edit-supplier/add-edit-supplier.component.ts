import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';

@Component({
    selector: 'app-add-edit-supplier',
    templateUrl: './add-edit-supplier.component.html',
    styleUrls: ['./add-edit-supplier.component.css']
})
export class AddEditSupplierComponent implements OnInit {
    @Input() supplier;
    @Input() type = 'add';
    @Output() response: EventEmitter<any> = new EventEmitter();
    newSupplier = {
        name: '',
        address: '',
        phone_no: '',
        email: '',
        products: ''
    }
    constructor(private _phonebook: PhonebookService, private helper: GlobalHelper) { }

    ngOnInit(): void {
    }

    addSupplier() {
        this._phonebook.addSupplier(this.newSupplier).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        });
    }

    updateSupplier() {
        this._phonebook.updateSupplier(this.supplier).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        });
    }

    deleteSupplier() {
        this._phonebook.deleteSupplier({ id: this.supplier.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        });
    }
    cancel() {
        this.response.emit({ success: false });
    }

}
