import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FscService } from 'src/app/shared/services/fsc.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-customer-order',
    templateUrl: './customer-order.component.html',
    styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {
    searchParams = {
        search: '',
        page_size: 10,
        page: 1,
        sort_column: 'work_number',
        sort_value: 'DESC'
    }
    totalPages: 1;
    pageFrom = 1;
    pageTo = 10;
    totalCount = 10;
    fscList = [];
    dateToday = new Date();
    notificationSubscription: Subscription;
    constructor(private ref: ChangeDetectorRef, private _fsc: FscService,private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.getFscListing();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('customer-orders', 'fsc', this.fscList, res);
            if(isCreated == true) {
                this.getFscListing();
            }else {this.ref.detectChanges();}
        })
    }

    getFscListing() {
        this._fsc.listing(this.searchParams).subscribe(res => {
            this.fscList = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
        })
    }
    searchOrder(type) {
        this.searchParams.page = 1;
        this.getFscListing();
    }

    changePage(event) {
        this.searchParams.page = event;
        this.getFscListing();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getFscListing();
    }

    downloadData(type) {
        this.searchParams['type'] = type
        this._fsc.downloadCustomerOrder(this.searchParams).subscribe(res => {
            window.open(res.data.link);
        })
    }

    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        console.log(this.searchParams);

        this.getFscListing();
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
