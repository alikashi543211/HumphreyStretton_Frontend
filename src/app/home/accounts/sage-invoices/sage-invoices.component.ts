import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-sage-invoices',
    templateUrl: './sage-invoices.component.html',
    styleUrls: ['./sage-invoices.component.css']
})
export class SageInvoicesComponent implements OnInit {

    invoices = [];
    dateToday = new Date()
    startDate;
    endDate;
    firstCall = true;
    searchParams = {
        search: '',
        start_date: null,
        end_date: null,
        page_size: 10,
        page: 1
    }
    totalPages = 1;
    pageFrom = 1;
    pageTo = 10;
    totalCount = 10;
    notificationSubscription: Subscription;
    constructor(private ref: ChangeDetectorRef, private _account: AccountService, public _auth: AuthService,private helper: GlobalHelper, private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.getInvoices();
        this.getNotifications();
        setTimeout(() => {
            this.firstCall = false;
        }, 500);
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('sage', 'accounts', this.invoices, res);
            if(isCreated == true) {
                this.getInvoices();
            }else {this.ref.detectChanges();}
        })
    }

    getInvoices() {
        this._account.sageInvoiceListing(this.searchParams).subscribe(res => {
            this.invoices = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;
        });
    }

    resendInvoice(invoice, i) {
        this._account.sageInvoiceCreate({ id: invoice.id }).subscribe(res => {
            this.invoices[i] = res.data
        });
    }

    checkInvoiceStatus(invoice) {
        if (invoice?.quotation?.work_orders.find(x => x.status != 'Delivered') == undefined) {
            return true;
        } else return false;
    }
    searchOrder(type, date = null) {
        this.searchParams.page = 1;
        if (type == 'search') {
            this.getInvoices();
        }
        setTimeout(() => {
            if (type == 'date' && ((this.startDate && this.endDate) || (!this.startDate && !this.endDate)) && !this.firstCall) {
                this.searchParams.start_date = this.startDate ? this.datePipe.transform(this.startDate, 'YYYY-MM-dd') : null;
                this.searchParams.end_date = this.endDate ? this.datePipe.transform(this.endDate, 'YYYY-MM-dd') : null;
                this.getInvoices();
            }
        }, 50);
    }

    changePage(event) {
        this.searchParams.page = event;
        this.getInvoices();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getInvoices();
    }

    updateInvoiceStatus (invoice, event) {
        let invoiceObj = {id: invoice.id, is_verified: event.target.checked};
        this._account.sageInvoiceVerification(invoiceObj).subscribe(res => {
        });
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
