import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UpdateDeliveryOrderComponent } from 'src/app/components/modals/delivery-list/update-delivery-order/update-delivery-order.component';
import { AddJobNotesComponent } from 'src/app/components/modals/rod/add-job-notes/add-job-notes.component';
import { TimelineComponent } from 'src/app/components/modals/rod/timeline/timeline.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DeliveryListService } from 'src/app/shared/services/deliveryList.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';

@Component({
    selector: 'app-delivery',
    templateUrl: './delivery.component.html',
    styleUrls: ['./delivery.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DeliveryComponent implements OnInit {

    deliveryListView: number = 1;
    deliveries = [];
    startDate;
    endDate;
    searchParams = {
        search: '',
        start_date: null,
        end_date: null,
        page_size: 100,
        page: 1,
        sort_column: 'due_date',
        sort_value: 'DESC'
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
    editDueDate: boolean = false;
    searchSubscription: Subscription;
    notificationSubscription: Subscription;
    dateToday = new Date();
    currentDate = null;
    colorPresets = ['#FBFACD', '#DEBACE', '#BA94D1', '#F7A4A4', '#FEBE8C', '#FFFBC1', '#E97777', '#FF9F9F', '#FCDDB0', '#BCEAD5', '#FF8DC7', '#B3FFAE', '#C8FFD4', '#2192FF', '#B1B2FF'];
    constructor(private ref: ChangeDetectorRef, private _delivery: DeliveryListService, private _modal: NgbModal,private helper: GlobalHelper , private router: Router, private datePipe: DatePipe, public _auth: AuthService) {

    }

    ngOnInit(): void {
        this.getDeliveryListing();
        this.getNotifications();
    }

    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            console.log('deliveries notifications called');
            let isCreated = this.helper.checkNotification('delivery', 'delivery-list', this.deliveries, res);
            if(isCreated == true) {
                this.getDeliveryListing();
            }else {
                this.ref.detectChanges();
                // this.notificationSubscription.unsubscribe();
            }
        })
    }

    getDeliveryListing() {
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
        this.searchSubscription = this._delivery.listing(this.searchParams).subscribe(res => {
            this.deliveries = res.data.data;
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;;
            this.deliveries = res.data.data.map(delivery => {
                delivery.due_date = new Date(delivery.due_date);
                return delivery;
            });
        });
    }

    updateStatus(delivery, index) {
        let data = {
            id: delivery.id,
            status: delivery.status == 'In Factory' ? 'To Factory' : 'In Factory'
        }
        this._delivery.updateDeliveryListStatus(data).subscribe(res => {
            this.deliveries[index] = res.data;
            this.deliveries[index].due_date = new Date(res.data.due_date);
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
        delivery.due_date = this.datePipe.transform(delivery.due_date, 'YYYY-MM-dd');
        let tags = []
        delivery.delivery_tags.forEach(element => {
            tags.push(element.title);
        });
        let temp = JSON.parse(JSON.stringify(delivery));
        temp.delivery_tags = tags;
        this._delivery.updateDeliveryList(temp).subscribe(res => {
            this.deliveries[index] = res.data;
            this.deliveries[index].due_date = new Date(res.data.due_date);
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
                this.getDeliveryListing();
                jobNoteModal.dismiss();
                this.modalConfig.windowClass = "modal-roles"
            }
        });
    }

    viewTimeline(rod, index) {
        this.modalConfig.windowClass = 'modal-roles timeline';
        const timelineModal = this._modal.open(TimelineComponent, this.modalConfig);
        timelineModal.componentInstance.rod = { ...rod };
        timelineModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.router.navigate(['rod/delivery-notes', rod.id]);
            }
            if (res.data) {
                this.deliveries[index] = res.data;
                this.deliveries[index].due_date = new Date(res.data.due_date);
            }
            timelineModal.dismiss();
            this.modalConfig.windowClass = 'modal-roles';
        });

    }

    editWorkOrder(delivery, index) {
        this.modalConfig.windowClass = 'modal-roles edit-work-order'
        const modal = this._modal.open(UpdateDeliveryOrderComponent, this.modalConfig);
        modal.componentInstance.order = JSON.parse(JSON.stringify(delivery));
        modal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.deliveries[index] = res.data;
                this.deliveries[index].due_date = new Date(res.data.due_date);
            }
            modal.close();
        })

    }

    searchOrder(type, date = null) {
        this.searchParams.page = 1;
        if (type == 'search') {
            this.getDeliveryListing();
        }
        setTimeout(() => {
            if (type == 'date' && ((this.startDate && this.endDate) || (!this.startDate && !this.endDate))) {
                this.searchParams.start_date = this.startDate ? this.datePipe.transform(this.startDate, 'YYYY-MM-dd') : null;
                this.searchParams.end_date = this.endDate ? this.datePipe.transform(this.endDate, 'YYYY-MM-dd') : null;
                this.getDeliveryListing();
            }
        }, 50);
    }
    changePage(event) {
        this.searchParams.page = event;
        this.getDeliveryListing();
    }

    ChangePageSize(event) {
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.getDeliveryListing();
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
        this.getDeliveryListing();
    }

    dateChanged(index) {
        let delivery = JSON.parse(JSON.stringify(this.deliveries[index]));
        if (this.datePipe.transform(this.currentDate, 'YYYY-MM-dd') == this.datePipe.transform(delivery.due_date, 'YYYY-MM-dd'))
            return;
        delivery.due_date = this.datePipe.transform(delivery.due_date, 'YYYY-MM-dd');
        this._delivery.updateDeliveryList(delivery).subscribe(res => {
            this.getDeliveryListing()
        }, error => {
            this.deliveries[index].due_date = this.currentDate;
        });

    }

    moveToStorage(delivery, i) {
        let payload = {
            id: delivery.id,
            is_storage: true
        };
        this._delivery.updateStorage(payload).subscribe(res => {
            this.getDeliveryListing();
        })
    }

    convertDate(order) {
        order.due_date = this.datePipe.transform(order.due_date, 'YYYY-MM-dd')
    }

    rowDrop(event: CdkDragDrop<string[]>) {
        if (event.previousIndex != event.currentIndex) {
            moveItemInArray(this.deliveries, event.previousIndex, event.currentIndex)
            let dateIndex = 0;
            if (event.currentIndex == 0) {
                dateIndex = 1;
            } else if (event.previousIndex < event.currentIndex) {
                dateIndex = event.currentIndex - 1;
            } else dateIndex = event.currentIndex + 1;
            let delivery = JSON.parse(JSON.stringify(this.deliveries[event.currentIndex]));
            let date = new Date(JSON.parse(JSON.stringify(this.deliveries[dateIndex])).due_date);
            let first = date.getDate() - date.getDay() + 1;
            let monday = new Date(date.setDate(first));
            delivery.due_date = this.datePipe.transform(monday, 'YYYY-MM-dd')
            this._delivery.updateDeliveryListOrder(delivery).subscribe(res => {
                this.deliveries[event.currentIndex] = res.data;
                this.deliveries[event.currentIndex].due_date = new Date(res.data.due_date)
            })
        }
    }
    colorChanged(index, delivery) {
        let d = JSON.parse(JSON.stringify(delivery));
        d.due_date = this.datePipe.transform(d.due_date, 'YYYY-MM-dd');
        let tags = d.delivery_tags.map(element => {
            return element.title
        })
        d.delivery_tags = tags;
        console.log('Delivery', d);
        this._delivery.updateDeliveryList(d).subscribe(res => {
            this.deliveries[index] = res.data;
            this.deliveries[index].due_date = new Date(res.data.due_date);
        }, err => {
            console.log('Color UPdated error', err);
        });
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
