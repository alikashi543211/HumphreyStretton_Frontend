import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ViewCreditCheckDetailsComponent } from 'src/app/components/modals/accounts/view-credit-check-details/view-credit-check-details.component';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-credit-check',
    templateUrl: './credit-check.component.html',
    styleUrls: ['./credit-check.component.css']
})
export class CreditCheckComponent implements OnInit {
    creditChecks = [];
    dateToday = new Date();
    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        windowClass: "modal-roles Fixed-cost-modal"
    };
    searchParams = {
        search: '',
        page_size: 10,
        page: 1,
        sort_column: "due_date",
        sort_value: 'DESC'
    }
    totalPages = 1;
    pageFrom = 1;
    pageTo = 10;
    totalCount = 10;
    checked: boolean = false;
    checkAll: boolean = false;
    notificationSubscription: Subscription;
    constructor(private ref: ChangeDetectorRef, private _account: AccountService, private _modal: NgbModal,private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.getCreditChecks();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('credit-check', 'accounts', this.creditChecks, res);
            if(isCreated == true) {
                this.getCreditChecks();
            }else {this.ref.detectChanges();}
        })
    }

    getCreditChecks() {
        this._account.creditCheckListing(this.searchParams).subscribe(res => {
            this.creditChecks = res.data.data.map(el => {
                el.checked = false;
                return el;
            });
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
        })
    }

    search() {
        this.searchParams.page = 1;
        this.getCreditChecks();
    }
    selectOptions() {
        console.log(this.creditChecks);
        this.checked = this.creditChecks.find((x: any) => x.checked) ? true : false
        this.checkAll = this.creditChecks.find((x: any) => !x.checked) ? false : true
    }

    selectAll() {
        if (this.checkAll) {
            this.creditChecks.map((x: any) => x.checked = true)
        } else {
            this.creditChecks.map((x: any) => x.checked = false)
        }
        this.checkAll = this.creditChecks.find((x: any) => !x.checked) ? false : true
        this.selectOptions();
    }
    creditCheck() {
        console.log(this.creditChecks);
        this.modalConfig.windowClass = 'modal-roles change-status-modal credit-modal';
        const creditCheckModal = this._modal.open(ViewCreditCheckDetailsComponent, this.modalConfig);
        creditCheckModal.componentInstance.credits = this.creditChecks;
        creditCheckModal.componentInstance.response.subscribe(res => {
            creditCheckModal.dismiss();
        })
    }

    changePage(event) {
        this.searchParams.page = event;
        this.getCreditChecks();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getCreditChecks();
    }
    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        this.getCreditChecks();
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
