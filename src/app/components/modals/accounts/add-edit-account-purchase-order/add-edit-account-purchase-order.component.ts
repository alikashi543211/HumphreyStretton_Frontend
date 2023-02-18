import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';
import { RodService } from 'src/app/shared/services/rod.service';
import { AddEditSupplierComponent } from '../../phonebook/add-edit-supplier/add-edit-supplier.component';

@Component({
    selector: 'app-add-edit-account-purchase-order',
    templateUrl: './add-edit-account-purchase-order.component.html',
    styleUrls: ['./add-edit-account-purchase-order.component.css']
})
export class AddEditAccountPurchaseOrderComponent implements OnInit {
    @Input() type = 'add';
    @Input() salesOrder;
    @Output() response: EventEmitter<any> = new EventEmitter();
    newPurchaseOrder = {
        order_number: '',
        value: '',
        supplier_id: '',
        work_order_id: [],
        due_date: '',
        note: ''
    }
    orders = [];
    suppliers = [];
    selectedSupplier = '';
    supplierInput: boolean = false;
    searchSubscription: Subscription;
    orderInput: boolean = false;
    selectedOrder = '';
    selectedOrders = [];
    currentDate = new Date();
    selectedDate;

    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        windowClass: "modal-roles add-phone-book-modal"
    };
    constructor(private helper: GlobalHelper, private _account: AccountService, private datePipe: DatePipe, private _modal: NgbModal) { }

    ngOnInit(): void {
        this.getOrders();
        this.getSuppliers();
        if (this.type == 'edit') {
            this.updateOrderObj()
        }
    }

    updateOrderObj() {
        this.selectedDate = new Date(this.salesOrder.due_date);
        this.selectedSupplier = this.salesOrder.supplier.name

        //NEW
        let temp = JSON.stringify(this.salesOrder.work_orders);
        this.selectedOrders = JSON.parse(temp);
        this.salesOrder['work_order_id'] = [];
        for(let i=0; i<this.salesOrder.work_orders.length; i++) {
            this.salesOrder.work_order_id[i] = this.salesOrder.work_orders[i]['id'];
        }

        this.selectedOrder = this.salesOrder.order?.work_number;
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
                this.newPurchaseOrder.supplier_id = res.data.data[0] ? res.data.data[0]?.id : null;

            })
        }
    }

    getOrders(event = null) {
        let search = '';
        if (event) {
            search = event.target.value;
        }
        if (search.length >= 3 || search.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe();
            this._account.workOrderListing({ search: search }).subscribe(res => {
                this.orders = res.data.data;
            });
        }
    }
    cancel() {
        this.response.emit({ success: false });
    }

    addOrder() {
        this._account.addPurchaseOrder(this.newPurchaseOrder).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    updateOrder() {
        this._account.updatePurchaseOrder(this.salesOrder).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        })
    }

    selectSupplier(supplier) {
        if (supplier == 'new') {
            const supplierModal = this._modal.open(AddEditSupplierComponent, this.modalConfig);
            supplierModal.componentInstance.response.subscribe(res => {
                if (res.success) {
                    this.selectedSupplier = res.data.name;
                    this.newPurchaseOrder.supplier_id = res.data.id;
                    if (this.type == 'edit') this.salesOrder.supplier_id = res.data.id;
                }
                supplierModal.dismiss();
            })
        } else {
            this.selectedSupplier = supplier.name;
            this.newPurchaseOrder.supplier_id = supplier.id;
            if (this.type == 'edit') this.salesOrder.supplier_id = supplier.id;
        }
    }

    selectOrder(order) {
        
        if (!this.selectedOrders.find((x: any) => x.work_number == order.work_number)) {
            this.selectedOrders.push(order);
            this.newPurchaseOrder.work_order_id.push(order.id);
            this.salesOrder?.work_order_id.push(order.id);
        }
    }

    removeOrder(index: number) {
        this.selectedOrders.splice(index, 1);
        this.newPurchaseOrder.work_order_id.splice(index, 1);
        this.salesOrder?.work_order_id.splice(index, 1);
    }

    supplierInputOut() {
        setTimeout(() => {
            this.supplierInput = false
        }, 200);
    }

    orderInputOut() {
        setTimeout(() => {
            this.orderInput = false
        }, 200);
    }

    dateValue(event) {
        this.newPurchaseOrder.due_date = this.datePipe.transform(event, 'YYYY-MM-dd');
        if (this.type == 'edit')
            this.salesOrder.due_date = this.datePipe.transform(event, 'YYYY-MM-dd');
    }

}