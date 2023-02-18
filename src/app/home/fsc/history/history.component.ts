import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditPurchaseOrdersComponent } from 'src/app/components/modals/fsc/add-edit-purchase-orders/add-edit-purchase-orders.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FscService } from 'src/app/shared/services/fsc.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    purchaseOrders = [];
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
            let isCreated = this.helper.checkNotification('history', 'fsc', this.purchaseOrders, res);
            if(isCreated == true) {
                this.getPurchaseListing();
            }else {this.ref.detectChanges();}
        })
    }

    getPurchaseListing() {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        this.searchSubscription = this._fsc.history(this.searchParams).subscribe(res => {
            this.purchaseOrders = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
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

    restorePurchaseOrder(purchase) {
        this._fsc.updateStatus({ id: purchase.id, status: 'Pending' }).subscribe(res => {
            this.getPurchaseListing();
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

    downloadData() {
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
