import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditAccountPurchaseOrderComponent } from 'src/app/components/modals/accounts/add-edit-account-purchase-order/add-edit-account-purchase-order.component';
import { AddEditAccountSalesOrderComponent } from 'src/app/components/modals/accounts/add-edit-account-sales-order/add-edit-account-sales-order.component';
import { CalculateSalesOrderComponent } from 'src/app/components/modals/accounts/calculate-sales-order/calculate-sales-order.component';
import { AddJobNotesComponent } from 'src/app/components/modals/rod/add-job-notes/add-job-notes.component';
import { DeleteConfirmationComponent } from 'src/app/components/modals/rod/delete-confirmation/delete-confirmation.component';
import { TimelineComponent } from 'src/app/components/modals/rod/timeline/timeline.component';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    account;
    customerTotals = [];
    salesOrder = [];
    purchaseOrders = [];
    dateToday = new Date();
    searchParams = {
        search: '',
        page_size: 10,
        page: 1,
        month: '',
        sort_column: 'work_orders.work_number',
        sort_value: 'DESC'
    }
    totalPages = 1;
    pageFrom = 1;
    pageTo = 10;
    totalCount = 10;
    activeTab = 'salesOrder';
    firstCall = true;
    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        // scrollable: true,
        size: 'xl',
        windowClass: "modal-roles Fixed-cost-modal"
    };
    notificationSubscription: Subscription;
    accountsMonth = new Date();
    constructor(private ref: ChangeDetectorRef, private _account: AccountService, private _modal: NgbModal, private helper: GlobalHelper, private datePipe: DatePipe, private router: Router, public _auth: AuthService) {
        this.searchParams.month = this.datePipe.transform(this.accountsMonth, 'YYYY-MM');
    }

    ngOnInit(): void {
        this.getAccountStats()
        this.getListing();
        this.getNotifications();
    }

    getAccountStats() {
        this._account.accountStats({ month: this.searchParams.month }).subscribe(res => {
            this.account = res.data;
        });
    }

    getCustomerTotalListing() {
        this._account.customerTotals(this.searchParams).subscribe(res => {
            this.customerTotals = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;
        });
    }

    getSalesOrderListing() {
        this._account.salesOrders(this.searchParams).subscribe(res => {
            this.salesOrder = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;
        });
    }

    getMontlyCostListing() {
        this._account.accountsPurchaseOrdersListing(this.searchParams).subscribe(res => {
            this.purchaseOrders = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
        });
    }

    markChecked(purchase, index) {
        this._account.updatePurchaseOrderStatus({ id: purchase.id }).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.purchaseOrders[index] = res.data;
        })
    }
    resetSearchParams() {
        this.searchParams = {
            search: '',
            page_size: 10,
            page: 1,
            month: this.searchParams.month,
            sort_column: 'work_orders.work_number',
            sort_value: 'DESC'
        }
        if (this.activeTab == 'salesOrder') {
            this.searchParams.sort_column = 'work_orders.work_number';
        } else if (this.activeTab == 'monthlyCost') {
            this.searchParams.sort_column = 'suppliers.name';
        } else if (this.activeTab == 'customerTotal') {
            this.searchParams.sort_column = 'name';
        }
        this.totalPages = 1
    }

    changeTab(tab: string) {
        this.activeTab = tab;
        this.resetSearchParams();
        this.getListing();
    }

    getListing() {
        if (this.activeTab == 'salesOrder') {
            this.getSalesOrderListing();
        } else if (this.activeTab == 'monthlyCost') {
            this.getMontlyCostListing();
        } else if (this.activeTab == 'customerTotal') {
            this.getCustomerTotalListing();
        }
    }

    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification(this.getComponentName(), 'accounts', this.getDataArray(), res);
            if(isCreated == true) {
                this.checkListing();
            }else {this.ref.detectChanges();}
        })
    }

    getComponentName() {
        if (this.activeTab == 'salesOrder') {
            return 'sale-order';
        } else if (this.activeTab == 'monthlyCost') {
            return 'purchase-cost';
        } else {
            return 'customer-total';
        }
    }

    getDataArray() {
        if (this.activeTab == 'salesOrder') {
            return this.salesOrder;
        } else if (this.activeTab == 'monthlyCost') {
            return this.purchaseOrders;
        } else {
            return this.customerTotals;
        }
    }

    checkListing() {
        if (this.activeTab == 'salesOrder') {
            this.getSalesOrderListing();
        } else if (this.activeTab == 'monthlyCost') {
            this.getMontlyCostListing();
        } else if (this.activeTab == 'customerTotal') {
            this.getCustomerTotalListing();
        }
    }

    calculateSalesOrder() {
        this.modalConfig.windowClass = "modal-roles calculate-sale-modal Fixed-cost-modal";
        // this.modalConfig.size = 'sm';
        const salesModal = this._modal.open(CalculateSalesOrderComponent, this.modalConfig);
        salesModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                // this.getAccountStats();
                // this.getListing();
            }
            this.modalConfig.size = 'xl';
            salesModal.dismiss();
        });
    }

    searchOrder() {
        this.searchParams.page = 1;
        this.getListing();
    }

    changePage(event) {
        this.searchParams.page = event;
        this.getListing();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getListing();
    }


    addSalesOrder() {
        this.modalConfig.windowClass = "modal-roles accounts-modal Fixed-cost-modal";
        const salesModal = this._modal.open(AddEditAccountSalesOrderComponent, this.modalConfig);
        salesModal.componentInstance.type = 'add';
        salesModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getAccountStats();
                this.getListing();
            }
            salesModal.dismiss();
        });

    }

    editSalesOrder(order, index) {
        this.modalConfig.windowClass = "modal-roles Fixed-cost-modal";
        const salesModal = this._modal.open(AddEditAccountSalesOrderComponent, this.modalConfig);
        salesModal.componentInstance.type = 'edit';
        salesModal.componentInstance.salesOrder = { ...order };
        salesModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getAccountStats();
                this.getListing();
            }
            salesModal.dismiss();
        });

    }

    addPurchaseOrder() {
        const purchaseModal = this._modal.open(AddEditAccountPurchaseOrderComponent, this.modalConfig);
        purchaseModal.componentInstance.type = 'add';
        purchaseModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getAccountStats();
                this.getListing();
            }
            purchaseModal.dismiss();
        });

    }

    editPurchaseOrder(order, index) {
        const purchaseModal = this._modal.open(AddEditAccountPurchaseOrderComponent, this.modalConfig);
        purchaseModal.componentInstance.type = 'edit';
        purchaseModal.componentInstance.salesOrder = { ...order };
        purchaseModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getAccountStats();
                this.getListing();
            }
            purchaseModal.dismiss();
        });

    }



    addJobNote(orderId, index) {
        this.modalConfig.windowClass = "modal-roles job-notes-modal"
        const jobNoteModal = this._modal.open(AddJobNotesComponent, this.modalConfig);
        jobNoteModal.componentInstance.orderId = orderId
        jobNoteModal.componentInstance.response.subscribe(res => {
            if (res.close) {
                this.getSalesOrderListing();
                jobNoteModal.dismiss();
                this.modalConfig.windowClass = "modal-roles"
            }
        });
    }

    updateSaleStatus(id, index) {
        this._account.updateSaleOrderStatus({ id: id }).subscribe(res => {
            this.salesOrder[index] = res.data;
            this.helper.toastSuccess(res.message);
        });
    }

    monthValue(event) {
        if(!this.firstCall) {
            this.searchParams.month = this.datePipe.transform(event, 'YYYY-MM')
            this.getAccountStats();
            this.getListing();
        }else {
            this.firstCall = false;
        }
    }

    viewTimeline(sale, index) {
        console.log(sale.work_order)
        this.modalConfig.windowClass = 'modal-roles timeline';
        const timelineModal = this._modal.open(TimelineComponent, this.modalConfig);
        timelineModal.componentInstance.rod = sale.work_order;
        timelineModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.router.navigate(['/rod/delivery-notes', sale.work_order_id]);
            }
            timelineModal.dismiss();
            this.modalConfig.windowClass = 'modal-roles';
        });

    }

    deleteOrder(sale, i) {
        const statusModal = this._modal.open(DeleteConfirmationComponent, this.modalConfig);
        statusModal.componentInstance.data = sale;
        statusModal.componentInstance.type = 'accountSaleOrder';
        statusModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getAccountStats();
                this.getListing();
            }
            statusModal.dismiss();
        });
    }
    deletePurchaseOrder(purchase, i) {
        const statusModal = this._modal.open(DeleteConfirmationComponent, this.modalConfig);
        statusModal.componentInstance.data = purchase;
        statusModal.componentInstance.type = 'accountPurchaseOrder';
        statusModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getAccountStats();
                this.getListing();
            }
            statusModal.dismiss();
        });
    }

    downloadData(type) {
        this.searchParams['type'] = type;
        if (this.activeTab == 'salesOrder') {
            if (this.salesOrder.length == 0) {
                return;
            }
            this._account.downloadSalesOrder(this.searchParams).subscribe(res => {
                window.open(res.data.link);
            });
        } else if (this.activeTab == 'monthlyCost') {
            if (this.purchaseOrders.length == 0) {
                return;
            }
            this._account.dowloadMonthlyCost(this.searchParams).subscribe(res => {
                window.open(res.data.link);
            });
        } else if (this.activeTab == 'customerTotal') {
            if (this.customerTotals.length == 0) {
                return;
            }
            this._account.downloadCustomerTotal(this.searchParams).subscribe(res => {
                window.open(res.data.link);
            });
        }
    }

    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        console.log(this.searchParams);

        this.getListing();
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
