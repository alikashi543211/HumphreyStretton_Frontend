import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { AdministrationService } from 'src/app/shared/services/administration.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-add-edit-account-sales-order',
    templateUrl: './add-edit-account-sales-order.component.html',
    styleUrls: ['./add-edit-account-sales-order.component.css']
})
export class AddEditAccountSalesOrderComponent implements OnInit {
    @Input() type = 'add';
    @Input() salesOrder;
    @Output() response: EventEmitter<any> = new EventEmitter();
    orders = [];
    selectedOrders = [];
    searchParams = {
        search: '',
        // customer_id: null
    };
    employees = [];
    newSalesOrder = {
        work_orders: this.selectedOrders,
        delivery_note: '',
        user_id: null,
    }
    selectedOrder = '';
    orderInput: boolean = false;
    employeeInput: boolean = false;
    customerInput: boolean = false;
    selectedEmployee = '';
    selectedCustomer = '';
    searchSubscription: Subscription;
    currentDate = new Date();
    selectedDate;
    customers = [];
    constructor(private helper: GlobalHelper, private _account: AccountService, private _administration: AdministrationService, private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        console.log('sale orers', this.salesOrder);
        this.getCustomers()
        this.getEmployees();
        if (this.type == 'edit') {
            this.mapUpdateObj()
        }

    }

    mapUpdateObj() {
        this.selectedDate = new Date(this.salesOrder.month);
        this.selectedOrder = this.salesOrder.work_order.work_number;
        this.selectedEmployee = this.salesOrder.user.name;
        this.salesOrder['is_update_work_order'] = false;
    }


    getEmployees(event = null) {
        let search = '';
        if (event) {
            search = event.target.value;
        }
        if (search.length >= 3 || search.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe();
            this._account.usersListing({ search: search }).subscribe(res => {
                this.employees = res.data.data;
                this.newSalesOrder.user_id = res.data.data[0] ? res.data.data[0]?.id : null;
                if (this.type == 'edit') {
                    this.selectedEmployee = this.employees.find(x => x.id == this.salesOrder.user_id)?.name
                }
            });
        }
    }
    selectOrder(order) {
        console.log(order);
        if (this.type == 'edit') {
            this.selectedOrder = order.work_number;
            this.salesOrder.work_order_id = order.id;
            return;
        }
        if (this.selectedOrders.find(x => x.id == order.id)) {
            return;
        }

        let obj = {
            work_order_id: order.id,
            number: order.work_number,
            model: order,
            month: new Date(order.due_date)
        }
        if(this.type == 'add') {
            obj['is_update_work_order'] = false;
        }
        // this.selectedOrders.push(obj)
        if(!this.selectedCustomer) {
            this.selectCustomer(order.customer);
            this.selectedOrders.push(obj)
        }else {
            if(this.selectedCustomer == order.customer.name) {
                this.selectedOrders.push(obj)
            }
        }
    }

    selectEmployee(employee) {
        this.selectedEmployee = employee.name;
        this.newSalesOrder.user_id = employee.id;
        this.salesOrder.user_id = employee.id;
    }

    searchOrder(event) {
        console.log('search order', event.target.value);
        let search = '';
        if (event) {
            this.searchParams.search = event.target.value;
            search = event.target.value;
        }
        if (search.length >= 3 || search.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe();
            this.searchSubscription = this._account.salesOrdersRodListing(this.searchParams).subscribe(res => {
                console.log('orders', res.data.data);
                this.orders = res.data.data;
            })
        }

    }
    searchCustomers(event) {
        let search = '';
        if (event) {
            search = event.target.value;
        }
        if (search.length >= 3 || search.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe();
            this.searchSubscription = this._account.customersListing({ search: search }).subscribe(res => {
                this.customers = res.data.data;
            })
        }

    }

    checkSelectedOrder(order) {
        if (this.selectedOrders.find(x => x.work_order_id == order.id)) {
            return true;
        } else return false;
    }

    getCustomers() {
        this._account.customersListing().subscribe(res => {
            this.customers = res.data.data;
        });
    }

    selectCustomer(customer) {
        // this.searchParams.customer_id = customer.id;
        this.selectedCustomer = customer.name.trim();
        this.customerInput = false;
        this.selectedOrders = [];
        this.getOrders();
    }

    getOrders(event = null) {
        let search = event ? event.term : '';
        this._account.salesOrdersRodListing(this.searchParams).subscribe(res => {
            this.orders = res.data.data;
        });
    }

    cancel() {
        this.response.emit({ success: false });
    }

    addOrder() {
        if(this.validateOrder()) {
            this.selectedOrders.map(order => {
                order.month = this.datePipe.transform(order.month, 'YYYY-MM-dd');
                return order;
            })
            this.newSalesOrder.work_orders = this.selectedOrders;
            this._account.addSalesOrder(this.newSalesOrder).subscribe(res => {
                this.helper.toastSuccess(res.message);
                this.response.emit({ success: true });
            })
        }
    }

    validateOrder () {
        for(let i=0; i<this.selectedOrders.length; i++) {
            console.log(this.selectedOrders[i]);
            if(!this.selectedOrders[i].value || !this.selectedOrders[i].other) {
                this.helper.toastError(`Please enter other or ${this.selectedOrders[i].model.product.name}.`);
                return false;
            }else if(this.selectedOrders[i].value<0 || this.selectedOrders[i].other<0) {
                this.helper.toastError(`Please enter other or ${this.selectedOrders[i].model.product.name}.`);
                return false;
            }
        }
        return true;
    }

    updateOrder() {
        if(this.salesOrder.other<0 || this.salesOrder.value<0) {
            this.helper.toastError(`Please enter other or ${this.salesOrder.work_order.product.name} price.`);
        }else if(this.salesOrder.other==null || this.salesOrder.value==null) {
            this.helper.toastError(`Please enter other or ${this.salesOrder.work_order.product.name} price.`);
        }else {
            this.salesOrder.month = this.datePipe.transform(this.selectedDate, 'YYYY-MM-dd');
            this._account.updateSaleOrder(this.salesOrder).subscribe(res => {
                this.helper.toastSuccess(res.message);
                this.response.emit({ success: true, data: res.data });
            })
        }
        
    }

    removeOrder(index) {
        this.selectedOrders.splice(index, 1);
    }

    orderInputOut() {
        setTimeout(() => {
            this.orderInput = false
        }, 200);
    }

    customerInputOut() {
        setTimeout(() => {
            this.customerInput = false
        }, 200);
    }

    employeeInputOut() {
        setTimeout(() => {
            this.employeeInput = false
        }, 200);
    }

    addDueDateStatus(event, i) {
        this.selectedOrders[i]['is_update_work_order'] = event.target.checked;
    }

    updateDueDateStatus(event) {
        this.salesOrder['is_update_work_order'] = event.target.checked;
    }

}
