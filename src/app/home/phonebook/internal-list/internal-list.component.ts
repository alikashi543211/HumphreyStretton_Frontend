import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditEmployeeComponent } from 'src/app/components/modals/phonebook/add-edit-employee/add-edit-employee.component';
import { DeleteConfirmationComponent } from 'src/app/components/modals/rod/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';

@Component({
    selector: 'app-internal-list',
    templateUrl: './internal-list.component.html',
    styleUrls: ['./internal-list.component.css']
})
export class InternalListComponent implements OnInit {
    employees = [];
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
        this.getEmployees();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('employees', 'phonebook', this.employees, res);
            if(isCreated == true) {
                this.getEmployees();
            }else {this.ref.detectChanges();}
        })
    }

    getEmployees() {
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
        this.searchSubscription = this._phonebook.employeesListing(this.searchParams).subscribe(res => {
            this.employees = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
        })
    }

    searchEmployees() {
        this.searchParams.page = 1
        this.getEmployees();
    }
    changePage(event) {
        this.searchParams.page = event;
        this.getEmployees();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getEmployees();
    }

    addEmployee() {
        const modal = this._modal.open(AddEditEmployeeComponent, this.modalConfig)
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.getEmployees();
            }
            modal.dismiss();
        })
    }

    editEmployee(employee, index) {
        const modal = this._modal.open(AddEditEmployeeComponent, this.modalConfig)
        modal.componentInstance.employee = { ...employee };
        modal.componentInstance.type = 'edit';
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.employees[index] = res.data;
            }
            modal.dismiss();
        })
    }

    deleteEmployee(employee, index) {
        const modal = this._modal.open(DeleteConfirmationComponent, this.modalConfig)
        modal.componentInstance.data = { ...employee };
        modal.componentInstance.type = 'employee';
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.employees.splice(index, 1);
            }
            modal.dismiss();
        })
    }


    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        this.getEmployees();
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
