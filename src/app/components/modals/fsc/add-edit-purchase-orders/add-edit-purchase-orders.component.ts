import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Observable, of, OperatorFunction, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FscService } from 'src/app/shared/services/fsc.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-add-edit-purchase-orders',
    templateUrl: './add-edit-purchase-orders.component.html',
    styleUrls: ['./add-edit-purchase-orders.component.css']
})
export class AddEditPurchaseOrdersComponent implements OnInit {
    @Input() order;
    @Input() type;
    @Output() response: EventEmitter<any> = new EventEmitter();
    currentDate;
    fscType: string = 'Order';
    newOrder = {
        type: 'Order',
        date: null,
        order_number: null,
        work_order_id: null,
        product_type: null,
        fsc_claim: null,
        quantity: '',
        invoice_value: '',
        supplier_id: undefined,
        material: null,
        schedule_ref: ''
    }
    workOrders = [];
    suppliers = [];
    selectedOrder = {
        work_number: '',
        order_number: '',
    };
    selectedSupplier = '';
    workNumberInput: boolean = false;
    orderNumberInput: boolean = false;
    supplierInput: boolean = false;
    searchSubscription: Subscription;
    constructor(private datePipe: DatePipe, private _helper: GlobalHelper, private _fsc: FscService, private _rod: RodService, private _phonebook: PhonebookService) {
    }

    ngOnInit(): void {
        if (this.type == 'edit') {
            console.log(this.order);

            this.currentDate = new Date(this.order.date);
            this.selectedSupplier = this.order.supplier?.name;
            this.selectedOrder.order_number = this.order.order.order_number;
            this.selectedOrder.work_number = this.order.work_number;
        }
        this.getWorkOrders();
        this.getSuppliers();
    }

    getWorkOrders(event = null) {
        let search = '';
        if (event) {
            search = event.target.value;
        }
        if (search.length >= 3 || search.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe();
            this._fsc.ordersListing({ search: search }).subscribe(res => {
                this.workOrders = res.data.data;
            });
        }
    }

    getSuppliers(event = null) {
        let search = '';
        if (event) {
            search = event.target.value;
        }
        if (search.length >= 3 || search.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe();
            this._fsc.supplierListing({ search: search }).subscribe(res => {
                this.suppliers = res.data.data;
            });
        }
    }

    selectOrder(order) {
        this.selectedOrder.work_number = order.work_number;
        this.selectedOrder.order_number = order.order_number;
        if (this.type == 'add') {
            this.newOrder.work_order_id = order.id;
        } else this.order.work_order_id = order.id;
    }

    selectSupplier(supplier) {
        this.selectedSupplier = supplier.name;
        if (this.type == 'add') {
            this.newOrder.supplier_id = supplier.id;
        } else this.order.supplier_id = supplier.id;
    }


    addPurchaseOrder() {
        if (!this.validateOrder()) {
            return;
        }
        this._fsc.addPurchaseOrder(this.newOrder).subscribe(res => {
            this._helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    close() {
        this.response.emit({ success: false });
    }

    updatePuchaseOrder() {
        if (!this.validateUpdateOrder()) {
            return;
        }
        this._fsc.updateOrder(this.order).subscribe(res => {
            this._helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        })
    }


    validateOrder() {
        if (!this.newOrder.date) {
            this._helper.toastError('Please select date');
            return false;
        }

        if (this.newOrder.type == 'Order') {
            if (!this.newOrder.work_order_id) {
                this._helper.toastError('Please enter order number');
                return false;
            }

        }
        if (this.newOrder.type == 'Stock') {
            if (!this.newOrder.supplier_id) {
                this._helper.toastError('Please select supplier');
                return false;
            }

            if (!this.newOrder.order_number) {
                this._helper.toastError('Please enter order_number');
                return false;
            }
        }
        if (!this.newOrder.product_type) {
            this._helper.toastError('Please select product type');
            return false;
        }
        if (!this.newOrder.quantity) {
            this._helper.toastError('Please enter quantity');
            return false;
        }
        if (!this.newOrder.fsc_claim) {
            this._helper.toastError('please select FSC Claim');
            return false;
        }
        if (!this.newOrder.invoice_value) {
            this._helper.toastError('Please enter invoice value');
            return false;
        }
        if (!this.newOrder.material) {
            this._helper.toastError('Please select material');
            return false;
        }
        return true;
    }

    validateUpdateOrder() {
        if (!this.order.date) {
            this._helper.toastError('Please select date');
            return false;
        }

        if (this.order.type == 'Order') {
            if (!this.order.work_order_id) {
                this._helper.toastError('Please enter order number');
                return false;
            }

        }
        if (this.order.type == 'Stock') {
            if (!this.order.supplier_id) {
                this._helper.toastError('Please select supplier');
                return false;
            }

            if (!this.order.order_number) {
                this._helper.toastError('Please enter order_number');
                return false;
            }
        }
        if (!this.order.product_type) {
            this._helper.toastError('Please select product type');
            return false;
        }
        if (!this.order.quantity) {
            this._helper.toastError('Please enter quantity');
            return false;
        }
        if (!this.order.fsc_claim) {
            this._helper.toastError('please select FSC Claim');
            return false;
        }
        if (!this.order.invoice_value) {
            this._helper.toastError('Please enter invoice value');
            return false;
        }
        if (!this.order.material) {
            this._helper.toastError('Please select material');
            return false;
        }
        return true;
    }

    deletePurchaseOrder() {
        this._fsc.deleteOrder({ id: this.order.id }).subscribe(res => {
            this._helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        })
    }

    dateChanged(value) {
        if (this.type == 'add') {
            this.newOrder.date = this.datePipe.transform(value, 'YYYY-MM-dd')
        } else this.order.date = this.datePipe.transform(value, 'YYYY-MM-dd')
    }

    orderInputOut() {
        setTimeout(() => {
            this.workNumberInput = false
        }, 200);
    }
    workInputOut() {
        setTimeout(() => {
            this.orderNumberInput = false
        }, 200);
    }
    supplierInputOut() {
        setTimeout(() => {
            this.supplierInput = false
        }, 200);
    }
}
