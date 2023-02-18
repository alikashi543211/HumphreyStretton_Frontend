import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditPurchaseOrdersComponent } from 'src/app/components/modals/fsc/add-edit-purchase-orders/add-edit-purchase-orders.component';
import { ShowPurchaseOrderSummaryComponent } from 'src/app/components/modals/fsc/show-purchase-order-summary/show-purchase-order-summary.component';
import { DeleteConfirmationComponent } from 'src/app/components/modals/rod/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FscService } from 'src/app/shared/services/fsc.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
    styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

    purchaseOrders = [];
    summary = [];
    colorsArray = [
        '#a883ba',
        '#b87c4c',
        '#7258db',
        '#87cafb',
        '#6fd693',
        '#4478f3',
        '#ffbb00',
        '#db71a2',
    ]

    // summary = [{product_type: 'Product 1', quantity: 10}, {product_type: 'Product 2', quantity: 30}];
    searchParams = {
        search: '',
        start_date: '',
        end_date: '',
        page_size: 10,
        page: 1,
        sort_column: 'date',
        sort_value: 'DESC'
    }
    totalPages: 1;
    pageFrom = 1;
    pageTo = 10;
    totalCount = 10;
    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        windowClass: "modal-roles"
    };
    searchSubscription: Subscription;
    notificationSubscription: Subscription;
    dateToday = new Date();
    startDate;
    endDate;
    constructor(private ref: ChangeDetectorRef, private _fsc: FscService, private _modal: NgbModal, private datePipe: DatePipe, public _auth: AuthService,private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.getPurchaseListing();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('purchase-orders', 'fsc', this.purchaseOrders, res);
            if(isCreated == true) {
                this.getPurchaseListing();
            }else {this.ref.detectChanges();}
        })
    }

    getPurchaseListing() {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        this.searchSubscription = this._fsc.purchaseOrderListing(this.searchParams).subscribe(res => {
            
            this.purchaseOrders = res.data.data.data;
            this.summary = res.data.summary;
            this.searchParams.page_size = res.data.data.per_page
            this.searchParams.page = res.data.data.current_page
            this.totalPages = res.data.data.last_page
            this.pageFrom = res.data.data.from;
            this.pageTo = res.data.data.to;
            this.totalCount = res.data.data.total;
            // console.log('purchase', res, this.summary);
        });
    }

    searchOrder(type) {
        this.searchParams.page = 1;
        if (type == 'search') {
            this.getPurchaseListing();
        }
        setTimeout(() => {
            if (type == 'date' && ((this.startDate && this.endDate) || (!this.startDate && !this.endDate))) {
                this.searchParams.start_date = this.startDate ? this.datePipe.transform(this.startDate, 'YYYY-MM-dd') : null;
                this.searchParams.end_date = this.endDate ? this.datePipe.transform(this.endDate, 'YYYY-MM-dd') : null;
                this.getPurchaseListing();
            }
        }, 50);
    }

    // showSummary() {
    //     this.modalConfig.windowClass = "modal-roles modal-FSC-Order"
    //     const modal = this._modal.open(ShowPurchaseOrderSummaryComponent, this.modalConfig);
    //     // modal.componentInstance.type = 'edit';
    //     modal.componentInstance.summary = this.summary;
    //     modal.componentInstance.response.subscribe(res => {
    //         modal.dismiss();
    //         this.modalConfig.windowClass = "modal-roles";
    //     })
    // }

    editPurchaseOrder(p, i) {
        this.modalConfig.windowClass = "modal-roles modal-FSC-Order"
        const modal = this._modal.open(AddEditPurchaseOrdersComponent, this.modalConfig);
        modal.componentInstance.type = 'edit';
        modal.componentInstance.order = { ...p };
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.purchaseOrders[i] = res.data;
                this.getPurchaseListing();
            }
            modal.dismiss();
            this.modalConfig.windowClass = "modal-roles";
        })
    }

    completeOrder(purchase) {
        this._fsc.updateStatus({ id: purchase.id, status: 'Completed' }).subscribe(res => {
            this.getPurchaseListing();
        })
    }

    addPurchaseOrder() {
        this.modalConfig.windowClass = "modal-roles modal-FSC-Order"
        const modal = this._modal.open(AddEditPurchaseOrdersComponent, this.modalConfig);
        modal.componentInstance.type = 'add';
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getPurchaseListing();
            }
            modal.dismiss();
            this.modalConfig.windowClass = "modal-roles";
        })
    }

    deletePurchaseOrder(purchase, index) {
        this.modalConfig.windowClass = "modal-roles modal-FSC-Order"
        const modal = this._modal.open(AddEditPurchaseOrdersComponent, this.modalConfig);
        modal.componentInstance.order = { ...purchase };
        modal.componentInstance.type = 'delete';
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.purchaseOrders.splice(index, 1);
                this.getPurchaseListing();
            }
            modal.dismiss();
            this.modalConfig.windowClass = "modal-roles";
        })
    }


    changePage(event) {
        this.searchParams.page = event;
        this.getPurchaseListing();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getPurchaseListing();
    }

    downloadData(type) {
        this.searchParams['type'] = type;
        this._fsc.downloadPurchaseOrder(this.searchParams).subscribe(res => {
            window.open(res.data.link);
        })
    }

    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        console.log(this.searchParams);

        this.getPurchaseListing();
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
