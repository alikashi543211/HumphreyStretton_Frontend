import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';

@Component({
    selector: 'app-add-edit-fixed-cost',
    templateUrl: './add-edit-fixed-cost.component.html',
    styleUrls: ['./add-edit-fixed-cost.component.css']
})
export class AddEditFixedCostComponent implements OnInit {
    @Output() response: EventEmitter<any> = new EventEmitter();
    @Input() fixedCost;
    @Input() type = 'add';
    newFixedCost = {
        value: 0,
        supplier_id: 0,
        frequency: null,
        cost_dates: [],
        order_number: ''
    }
    suppliers = [];
    supplierInput: boolean = false;
    selectedSupplier = '';
    searchSubscription: Subscription;
    constructor(private _phonebook: PhonebookService, private _account: AccountService, private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.getSuppliers();
        this.selectedSupplier = this.fixedCost.supplier.name
    }

    getSuppliers(event = null) {
        let search = '';
        if (event) {
            search = event.target.value;
        }
        if (search.length >= 3 || search.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe();
            this._account.supplierListing({ search: search }).subscribe(res => {
                this.suppliers = res.data.data;
                this.newFixedCost.supplier_id = res.data.data[0]?.id;
            })
        }
    }

    selectMonth(event) {
        if (this.type == 'edit') {
            if (this.fixedCost.cost_dates.includes(event.target.value)) {
                event.target.value = null
                return;
            }
            this.fixedCost.cost_dates.push(event.target.value);
            event.target.value = null
        } else {
            if (this.newFixedCost.cost_dates.includes(event.target.value)) {
                event.target.value = null
                return;
            }
            this.newFixedCost.cost_dates.push(event.target.value);
            event.target.value = null
        }
    }

    removeDate(i) {
        if (this.type == 'add') {
            this.newFixedCost.cost_dates.splice(i, 1);
        } else {
            this.fixedCost.cost_dates.splice(i, 1);
        }
    }

    cancel() {
        this.response.emit({ success: false });
    }

    addFixedCost() {
        console.log(this.newFixedCost);
        this._account.addFixedCost(this.newFixedCost).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    udpateFixedCost() {
        this._account.updateFixedCost(this.fixedCost).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        })
    }
    selectSupplier(supplier) {
        this.selectedSupplier = supplier.name;
        if (this.type == 'add') {
            this.newFixedCost.supplier_id = supplier.id;
        } else this.fixedCost.supplier_id = supplier.id;

    }

    supplierInputOut() {
        setTimeout(() => {
            this.supplierInput = false
        }, 200);
    }

}
