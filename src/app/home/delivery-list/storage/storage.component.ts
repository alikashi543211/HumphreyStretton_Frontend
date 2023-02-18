import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UpdateDeliveryOrderComponent } from 'src/app/components/modals/delivery-list/update-delivery-order/update-delivery-order.component';
import { AddJobNotesComponent } from 'src/app/components/modals/rod/add-job-notes/add-job-notes.component';
import { TimelineComponent } from 'src/app/components/modals/rod/timeline/timeline.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DeliveryListService } from 'src/app/shared/services/deliveryList.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

    deliveryListView: number = 1;
    deliveries = [];
    startDate;
    endDate;
    searchParams = {
        search: '',
        start_date: null,
        end_date: null,
        page_size: 10,
        page: 1,
        sort_column: 'work_number',
        sort_value: 'DESC'
    }
    totalPages = 1;
    pageFrom = 1;
    pageTo = 10;
    totalCount = 10;
    checked: boolean = false;
    checkAll: boolean = false;
    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        windowClass: "modal-roles"
    };
    editDueDate: boolean = false;
    searchSubscription: Subscription;
    dateToday = new Date();
    currentDate = null;
    totalOrder = 0;
    notificationSubscription: Subscription;
    constructor(private ref: ChangeDetectorRef, private _delivery: DeliveryListService, private _modal: NgbModal,private helper: GlobalHelper, private router: Router, private datePipe: DatePipe, public _auth: AuthService) {

    }

    ngOnInit(): void {
        this.getStorageListing();
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            let isCreated = this.helper.checkNotification('storage', 'delivery-list', this.deliveries, res);
            if(isCreated == true) {
                this.getStorageListing();
            }else {this.ref.detectChanges();}
        })
    }

    getStorageListing() {
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
        this.searchSubscription = this._delivery.storageListing(this.searchParams).subscribe(res => {
            let data = res.data.orders
            this.totalOrder = res.data.total_orders_in_storage
            this.deliveries = data.data;
            this.searchParams.page_size = data.per_page
            this.searchParams.page = data.current_page
            this.totalPages = data.last_page
            this.pageFrom = data.from;
            this.pageTo = data.to;
            this.totalCount = data.total;
            console.log(this.deliveries, data)
        });
    }

    updateStatus(delivery, index) {
        let data = {
            id: delivery.id,
            status: delivery.status == 'In Factory' ? 'To Factory' : 'In Factory'
        }
        this._delivery.updateDeliveryListStatus(data).subscribe(res => {
            this.deliveries[index] = res.data;
        })
    }

    completeOrder(delivery, index) {
        let data = {
            id: delivery.id,
            status: 'Delivered'
        }
        this._delivery.updateDeliveryListStatus(data).subscribe(res => {
            this.deliveries.splice(index, 1);
        })
    }

    checkProductAttribute(delivery, attribute) {
        return delivery.attributes.find(x => x.name == attribute)
    }

    checkProductAttributeStatus(delivery, attribute) {
        return delivery.attributes.find(x => (x.name == attribute && x.checked));
    }

    updateDeliveryList(delivery, attribute, index) {
        delivery.attributes[delivery.attributes.indexOf(delivery.attributes.find(x => x.name == attribute))].checked = delivery.attributes[delivery.attributes.indexOf(delivery.attributes.find(x => x.name == attribute))].checked ? false : true;
        this._delivery.updateDeliveryList(delivery).subscribe(res => {
            this.deliveries[index] = res.data;
        }, err => {
            delivery.attributes[delivery.attributes.indexOf(delivery.attributes.find(x => x.name == attribute))].checked = delivery.attributes[delivery.attributes.indexOf(delivery.attributes.find(x => x.name == attribute))].checked ? false : true;
        });
    }

    addJobNote(orderId, index) {
        this.modalConfig.windowClass = "modal-roles job-notes-modal"
        const jobNoteModal = this._modal.open(AddJobNotesComponent, this.modalConfig);
        jobNoteModal.componentInstance.orderId = orderId
        jobNoteModal.componentInstance.response.subscribe(res => {
            if (res.success && !res.close) {
                this.deliveries[index] = res.data;
            }
            if (res.close) {
                this.getStorageListing();
                jobNoteModal.dismiss();
                this.modalConfig.windowClass = "modal-roles"
            }
        });
    }

    viewTimeline(rod, index) {
        this.modalConfig.windowClass = 'modal-roles timeline';
        console.log(rod);
        const timelineModal = this._modal.open(TimelineComponent, this.modalConfig);
        timelineModal.componentInstance.rod = { ...rod };
        timelineModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.router.navigate(['rod/delivery-notes', rod.id]);
            }
            if (res.data) {
                this.deliveries[index] = res.data;
            }
            timelineModal.dismiss();
            this.modalConfig.windowClass = 'modal-roles';
        });

    }

    editWorkOrder(delivery, index) {
        this.modalConfig.windowClass = 'modal-roles edit-work-order'
        const modal = this._modal.open(UpdateDeliveryOrderComponent, this.modalConfig);
        modal.componentInstance.order = { ...delivery };
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.deliveries[index] = res.data
            }
            modal.close();
        })

    }

    searchOrder(type, date = null) {
        this.searchParams.page = 1;
        if (type == 'search') {
            this.getStorageListing();
        }
        setTimeout(() => {
            if (type == 'date' && ((this.startDate && this.endDate) || (!this.startDate && !this.endDate))) {
                this.searchParams.start_date = this.startDate ? this.datePipe.transform(this.startDate, 'YYYY-MM-dd') : null;
                this.searchParams.end_date = this.endDate ? this.datePipe.transform(this.endDate, 'YYYY-MM-dd') : null;
                this.getStorageListing();
            }
        }, 50);
    }
    changePage(event) {
        this.searchParams.page = event;
        this.getStorageListing();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getStorageListing();
    }

    downloadData(type) {
        this.searchParams['type'] = type;
        this._delivery.downloadData(this.searchParams).subscribe(res => {
            window.open(res.data.link);
        })
    }

    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        this.getStorageListing();
    }

    dateChanged(index) {
        let delivery = { ...this.deliveries[index] }
        if (this.datePipe.transform(this.currentDate, 'YYYY-MM-dd') == this.datePipe.transform(delivery.due_date, 'YYYY-MM-dd'))
            return;
        delivery.due_date = this.datePipe.transform(delivery.due_date, 'YYYY-MM-dd');
        this._delivery.updateDeliveryList(delivery).subscribe(res => {
            this.getStorageListing()
        });
    }

    selectOptions() {
        this.checked = this.deliveries.find((x: any) => x.checked) ? true : false
        this.checkAll = this.deliveries.find((x: any) => !x.checked) ? false : true
    }

    selectAll() {
        console.log(this.checkAll, this.deliveries.find((x: any) => !x.checked))
        if (this.checkAll) {
            this.deliveries.map((x: any) => x.checked = true)
        } else {
            this.deliveries.map((x: any) => x.checked = false)
        }
        this.checkAll = this.deliveries.find((x: any) => !x.checked) ? false : true
        this.selectOptions();
    }
    moveToDelivery(storage) {
        let payload = {
            id: storage.id,
            is_storage: false
        }
        this._delivery.updateStorage(payload).subscribe(res => {
            this.getStorageListing();
        })
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
