import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditCustomerComponent } from 'src/app/components/modals/rod/add-edit-customer/add-edit-customer.component';
import { DeleteConfirmationComponent } from 'src/app/components/modals/rod/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from "../../../shared/services/phonebook.service";

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
    customers = [];
    searchParams = {
        search: '',
        page_size: 10,
        page: 1,
        sort_column: 'name',
        sort_value: 'ASC'
    }
    totalPages = 1;
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
    constructor(private ref: ChangeDetectorRef, private _phonebook: PhonebookService, private _modal: NgbModal, public _auth: AuthService,private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.getCustomerListing();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('customers', 'phonebook', this.customers, res);
            if(isCreated == true) {
                this.getCustomerListing();
            }else {this.ref.detectChanges();}
        })
    }

    getCustomerListing() {
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
        this.searchSubscription = this._phonebook.customerListing(this.searchParams).subscribe((res: any) => {
            this.customers = res.data.data
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
        })
    }

    searchCustomers() {
        this.searchParams.page = 1;
        this.getCustomerListing();
    }
    changePage(event) {
        this.searchParams.page = event;
        this.getCustomerListing();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getCustomerListing();
    }

    addCustomer() {
        const modal = this._modal.open(AddEditCustomerComponent, this.modalConfig)
        modal.componentInstance.response.subscribe(res => {
            console.log(res);
            if (res.success) {
                this.getCustomerListing();
            }
            modal.dismiss();
        })
    }

    editCustomer(customer, index) {
        const modal = this._modal.open(AddEditCustomerComponent, this.modalConfig)
        modal.componentInstance.cus = { ...customer };
        modal.componentInstance.type = 'edit';
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.customers[index] = res.data;
            }
            modal.dismiss();
        })
    }

    deleteCustomer(customer, index) {
        const modal = this._modal.open(DeleteConfirmationComponent, this.modalConfig)
        modal.componentInstance.data = { ...customer };
        modal.componentInstance.type = 'customer';
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.customers.splice(index, 1);
            }
            modal.dismiss();
        })
    }

    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        this.getCustomerListing();
    }

    sendPdfEmail(customer) {
        this._phonebook.customerOrdersPdfEmail({ id: customer.id }).subscribe(res => {
            if (res.data.link)
                window.open(res.data.link, '_blank');
        })
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
