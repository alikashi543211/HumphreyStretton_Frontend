import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditSupplierComponent } from 'src/app/components/modals/phonebook/add-edit-supplier/add-edit-supplier.component';
import { DeleteConfirmationComponent } from 'src/app/components/modals/rod/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';

@Component({
    selector: 'app-suppliers',
    templateUrl: './suppliers.component.html',
    styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
    suppliers = [];
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
        windowClass: "modal-roles add-phone-book-modal"
    };
    searchSubscription: Subscription;
    notificationSubscription: Subscription;
    dateToday = new Date();
    constructor(private ref: ChangeDetectorRef, private _phonebook: PhonebookService, private _modal: NgbModal, public _auth: AuthService,private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.getSuppliers();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('suppliers', 'phonebook', this.suppliers, res);
            if(isCreated == true) {
                this.getSuppliers();
            }else {this.ref.detectChanges();}
        })
    }


    getSuppliers() {
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
        this._phonebook.supplierListing(this.searchParams).subscribe(res => {
            this.suppliers = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
        });
    }

    searchSuppliers() {
        this.searchParams.page = 1;
        this.getSuppliers();
    }
    changePage(event) {
        this.searchParams.page = event;
        this.getSuppliers();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getSuppliers();
    }

    addSupplier() {
        const modal = this._modal.open(AddEditSupplierComponent, this.modalConfig)
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getSuppliers();
            }
            modal.dismiss();
        })
    }

    editSupplier(supplier, index) {
        const modal = this._modal.open(AddEditSupplierComponent, this.modalConfig)
        modal.componentInstance.supplier = { ...supplier };
        modal.componentInstance.type = 'edit';
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.suppliers[index] = res.data;
            }
            modal.dismiss();
        })
    }

    deleteSupplier(supplier, index) {
        const modal = this._modal.open(DeleteConfirmationComponent, this.modalConfig)
        modal.componentInstance.data = { ...supplier };
        modal.componentInstance.type = 'supplier';
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.suppliers.splice(index, 1);
            }
            modal.dismiss();
        })
    }

    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        this.getSuppliers();
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
