import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditFixedCostComponent } from 'src/app/components/modals/accounts/add-edit-fixed-cost/add-edit-fixed-cost.component';
import { DeleteConfirmationComponent } from 'src/app/components/modals/rod/delete-confirmation/delete-confirmation.component';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-fixed-cost',
    templateUrl: './fixed-cost.component.html',
    styleUrls: ['./fixed-cost.component.css']
})
export class FixedCostComponent implements OnInit {
    costs = [];
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
        sort_column: 'order_number',
        sort_value: 'ASC'
    }
    totalPages = 1;
    pageFrom = 1;
    pageTo = 10;
    totalCount = 10;
    notificationSubscription: Subscription;
    constructor(private ref: ChangeDetectorRef, private _modal: NgbModal, private _account: AccountService, public _auth: AuthService,private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.getFixedCosts();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('fixed-cost', 'accounts', this.costs, res);
            if(isCreated == true) {
                this.getFixedCosts();
            }else {this.ref.detectChanges();}
        })
    }

    getFixedCosts() {
        this._account.fixedCostListing(this.searchParams).subscribe(res => {
            this.costs = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
        })
    }

    addFixedCost() {
        const fixedCostModal = this._modal.open(AddEditFixedCostComponent, this.modalConfig);
        fixedCostModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getFixedCosts()
            }
            fixedCostModal.dismiss();
        })
    }
    editFixedCost(cost, index) {
        let copy = JSON.parse(JSON.stringify(cost));
        const fixedCostUpdateModal = this._modal.open(AddEditFixedCostComponent, this.modalConfig);
        fixedCostUpdateModal.componentInstance.type = 'edit';
        fixedCostUpdateModal.componentInstance.fixedCost = copy;
        fixedCostUpdateModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                console.log(res);
                this.costs[index] = res.data;
            }
            fixedCostUpdateModal.dismiss();
        })
    }

    deleteFixedCost(cost, index) {

        const fixedCostDeleteModal = this._modal.open(DeleteConfirmationComponent, this.modalConfig);
        fixedCostDeleteModal.componentInstance.type = 'fixedCost';
        fixedCostDeleteModal.componentInstance.data = { ...cost };
        fixedCostDeleteModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.costs.splice(index, 1);
            }
            fixedCostDeleteModal.dismiss();
        })
    }

    searchOrder(type, date = null) {
        this.searchParams.page = 1;
        if (type == 'search') {
            this.getFixedCosts();
        }
    }

    changePage(event) {
        this.searchParams.page = event;
        this.getFixedCosts();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getFixedCosts();
    }

    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        console.log(this.searchParams);

        this.getFixedCosts();
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
