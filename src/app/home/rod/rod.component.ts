import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AddEditSalesOrderComponent } from 'src/app/components/modals/rod/add-edit-sales-order/add-edit-sales-order.component';
import { AddJobNotesComponent } from 'src/app/components/modals/rod/add-job-notes/add-job-notes.component';
import { DeleteConfirmationComponent } from 'src/app/components/modals/rod/delete-confirmation/delete-confirmation.component';
import { TimelineComponent } from 'src/app/components/modals/rod/timeline/timeline.component';
import { UpdateInvoiceScheduleRefComponent } from 'src/app/components/modals/rod/update-invoice-schedule-ref/update-invoice-schedule-ref.component';
import { UpdateStatusComponent } from 'src/app/components/modals/rod/update-status/update-status.component';
import { AddMultipleJobNotesComponent } from 'src/app/components/modals/rod/add-multiple-job-notes/add-multiple-job-notes.component';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { RodService } from 'src/app/shared/services/rod.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusDeliveredConfirmationComponent } from 'src/app/components/modals/rod/status-delivered-confirmation/status-delivered-confirmation.component';
import { DeliveredWarningComponent } from 'src/app/components/modals/rod/delivered-warning/delivered-warning.component';

@Component({
    selector: 'app-rod',
    templateUrl: './rod.component.html',
    styleUrls: ['./rod.component.css']
})
export class RodComponent implements OnInit {

    rods = [];
    searchParams = {
        search: '',
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
    searchSubscription: Subscription;
    notificationSubscription: Subscription;
    multiUpdateType: string = 'invoice_no';
    dateToday = new Date();
    constructor(private ref: ChangeDetectorRef, private _rod: RodService, private helper: GlobalHelper, private _modal: NgbModal, private router: Router, public _auth: AuthService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.searchParams.search = params.work_number;
            this.rodListing();
        })
    }

    ngOnInit(): void {
        this.getNotifications();
    }
    
    getNotifications() {
        this.notificationSubscription = this.helper.currentNotification.subscribe(res => {
            // console.log('rod res', res);
            let isCreated = this.helper.checkNotification('work-orders', 'rod', this.rods, res);
            if(isCreated == true) {
                this.rodListing();
            }else {this.ref.detectChanges();}
        })
    }

    rodListing() {
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
        this.checked = false;
        this.searchSubscription = this._rod.rodListing(this.searchParams).subscribe(res => {
            this.searchParams.page_size = res.data.per_page
            this.searchParams.page = res.data.current_page
            this.totalPages = res.data.last_page
            this.pageFrom = res.data.from;
            this.pageTo = res.data.to;
            this.totalCount = res.data.total;
            this.checkAll = false;
            this.rods = res.data.data.map(rod => {
                rod.edit_invoice = false;
                rod.edit_schedule_ref = false;
                return rod;
            });
        });
    }

    selectOptions() {
        this.checked = this.rods.find((x: any) => x.checked) ? true : false
        this.checkAll = this.rods.find((x: any) => !x.checked) ? false : true
    }

    selectAll() {
        console.log(this.checkAll, this.rods.find((x: any) => !x.checked))
        if (this.checkAll) {
            this.rods.map((x: any) => x.checked = true)
        } else {
            this.rods.map((x: any) => x.checked = false)
        }
        this.checkAll = this.rods.find((x: any) => !x.checked) ? false : true
        this.selectOptions();
    }

    addSalesOrder() {
        const salesModal = this._modal.open(AddEditSalesOrderComponent, this.modalConfig);
        salesModal.componentInstance.type = 'add';
        salesModal.componentInstance.response.subscribe((res: any) => {
            if (res.success) {
                this.rodListing();
            }
            salesModal.close();
        });
    }

    editSalesOrder(order, index) {
        const salesModal = this._modal.open(AddEditSalesOrderComponent, this.modalConfig);
        salesModal.componentInstance.type = 'edit';
        salesModal.componentInstance.order = order;
        salesModal.componentInstance.response.subscribe((res: any) => {
            if (res.success) {
                this.rods[index] = res.data;
            }
            salesModal.close();
        });
    }


    addJobNote(orderId, index) {
        this.modalConfig.windowClass = "modal-roles job-notes-modal"
        const jobNoteModal = this._modal.open(AddJobNotesComponent, this.modalConfig);
        jobNoteModal.componentInstance.orderId = orderId
        jobNoteModal.componentInstance.response.subscribe(res => {
            if (res.success && !res.close) {
                this.rods[index] = res.data;
            }
            if (res.success && res.close) {
                jobNoteModal.dismiss();
            }
            if (res.close) {
                this.rodListing();
                jobNoteModal.dismiss();
                this.modalConfig.windowClass = "modal-roles"
            }
        });
    }

    editInvoiceNo(index) {
        this.rods[index].edit_invoice = true;
        setTimeout(function () {
            document.getElementById('edit-invoice-no-' + index).focus();
        }, 20);
    }


    editScheduleRef(index) {
        this.rods[index].edit_schedule_ref = true;
        setTimeout(function () {
            document.getElementById('edit-schedule-ref-' + index).focus();
        }, 20);
    }

    updateInvoiceNo(event, index) {
        if (event.type == 'keyup' && event.keyCode != 13) {
            return;
        }
        if (!event.target.value || event.target.value == this.rods[index].invoice_no) {
            this.rods[index].edit_invoice = false
            return;
        }
        let obj = {
            id: [this.rods[index].id],
            type: 'invoice_no',
            data: event.target.value
        }
        this._rod.multipleUpdateOrder(obj).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.rods[index].edit_invoice = false
            this.rods[index].invoice_no = obj.data;
        }, err => {
            this.rods[index].edit_invoice = false;
        });
    }

    updateScheduleRef(event, index) {
        let value = this.rods[index].schedule_ref;
        if (event.type == 'keyup' && event.keyCode != 13) {
            return;
        }
        if (!event.target.value || event.target.value == this.rods[index].schedule_ref) {
            this.rods[index].edit_schedule_ref = false
            return;
        }
        let obj = {
            id: [this.rods[index].id],
            type: 'schedule_ref',
            data: event.target.value
        }
        this._rod.multipleUpdateOrder(obj).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.rods[index].edit_schedule_ref = false
            this.rods[index].schedule_ref = obj.data;
        }, err => {
            this.rods[index].edit_schedule_ref = false;
        });
    }
    multipleUpdate(type: string) {
        this.multiUpdateType = type;
        let ids = [];
        this.rods.forEach(rod => {
            if (rod.checked) {
                ids.push(rod.id);
            }
        });
        console.log(ids);
        let payload = {
            id: ids,
            type: this.multiUpdateType,
            data: '',
        }
        const modal = this._modal.open(UpdateInvoiceScheduleRefComponent, this.modalConfig);
        modal.componentInstance.type = this.multiUpdateType;
        modal.componentInstance.response.subscribe(response => {
            if (response.success) {
                payload.data = response.data;
                this._rod.multipleUpdateOrder(payload).subscribe(res => {
                    this.helper.toastSuccess(res.message);
                    this.rods.forEach(rod => {
                        if (ids.find(x => x == rod.id)) {
                            rod[this.multiUpdateType] = response.data;
                        }
                    });
                    modal.dismiss();
                });

            } else modal.dismiss();
        })
    }

    updateStatus(rod, event, index) {
        let delivered = false;
        // return;
        if(event.target.value == 'Delivered' && rod.quotation != null) {
            delivered = true;
            // if(rod.quotation.is_verified) {
                if(rod.quotation.is_delivery_address_verified || rod.quotation.is_manual) {
                    delivered = false;
                }else {
                    this.modalConfig.windowClass = "modal-roles change-status-modal";
                    const confirmModal = this._modal.open(StatusDeliveredConfirmationComponent, this.modalConfig);
                    confirmModal.componentInstance.response.subscribe(res => {
                        confirmModal.dismiss();
                        if (res.success) {
                            this.openConfirmModal(rod, event, index, true);
                        }else {
                            event.target.value = rod.status;
                        }
                        this.modalConfig.windowClass = "modal-roles";
                    });
                }
            // }else {
            //     this.modalConfig.windowClass = "modal-roles change-status-modal";
            //     const statusModal = this._modal.open(DeliveredWarningComponent, this.modalConfig);
            //     statusModal.componentInstance.response.subscribe(res => {
            //         event.target.value = rod.status;
            //         statusModal.dismiss();
            //         this.modalConfig.windowClass = "modal-roles";
            //     });
            // }
            
        }
        if (event.target.value == 'On Hold' || event.target.value == 'Off Hold') {
            this.updateHoldStatus(rod);
            event.target.value = rod.status;
            return;
        }
        if (event.target.value == 'Move Storage') {
            this.updateStorageStatus(rod, event, index);
            return;
        }
        if(!delivered) {
            this.openConfirmModal(rod, event, index, false);
        }
        
    }

    openConfirmModal(rod, event, index, proceed) {
        let modalData = {
            hold: rod.on_hold,
            from: rod.status,
            to: event.target.value,
            model: [rod],
            status: event.target.value
        }
        this.modalConfig.windowClass = "modal-roles change-status-modal";
        const statusModal = this._modal.open(UpdateStatusComponent, this.modalConfig);
        statusModal.componentInstance.data = modalData;
        statusModal.componentInstance.proceed = proceed;
        statusModal.componentInstance.response.subscribe(res => {
            event.target.value = res.data.status;
            this.rods[index] = res.data
            statusModal.dismiss();
            this.modalConfig.windowClass = "modal-roles"
        });
    }

    updateHoldStatus(rod) {
        let modalData = {
            hold: rod.on_hold ? false : true,
            from: rod.on_hold ? 'On Hold' : rod.status,
            to: rod.on_hold ? 'Off Hold' : 'On Hold',
            model: [rod],
            status: rod.status
        }

        this.modalConfig.windowClass = "modal-roles change-status-modal";
        const statusModal = this._modal.open(UpdateStatusComponent, this.modalConfig);
        statusModal.componentInstance.data = modalData;
        statusModal.componentInstance.response.subscribe(res => {
            rod.on_hold = res.data.on_hold;
            statusModal.dismiss();
        });
        this.modalConfig.windowClass = "modal-roles"
    }

    updateStorageStatus(rod, event, index) {
        let modalData = {
            hold: rod.is_storage ? false : true,
            from: 'Storage',
            to: rod.status,
            model: [rod],
            status: rod.status
        }

        this.modalConfig.windowClass = "modal-roles change-status-modal";
        const statusModal = this._modal.open(UpdateStatusComponent, this.modalConfig);
        statusModal.componentInstance.data = modalData;
        statusModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.rods[index] = res.data
            } else {
                event.target.value = 'Storage';
            }
            statusModal.dismiss();
        });
        this.modalConfig.windowClass = "modal-roles"
    }

    deleteOrder(rod, i) {

        const statusModal = this._modal.open(DeleteConfirmationComponent, this.modalConfig);
        statusModal.componentInstance.data = rod;
        statusModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.rods.splice(i, 1);
            }
            statusModal.dismiss();
        });
    }

    viewTimeline(rod, index) {
        this.modalConfig.windowClass = 'modal-roles timeline';
        const timelineModal = this._modal.open(TimelineComponent, this.modalConfig);
        timelineModal.componentInstance.rod = rod;
        timelineModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.router.navigate(['rod/delivery-notes', rod.id]);
            }
            if (res.data) {
                this.rods[index] = res.data;
            }
            timelineModal.dismiss();
            this.modalConfig.windowClass = 'modal-roles';
        });

    }

    bulkStatusUpdate(event) {
        
        if (event.target.value != 'Off Hold') {
            if (!this.checkBulkStatus()) {
                this.helper.toastError('Only orders with same status can be updated in bulk.');
                event.target.value = 'select'
                return;
            }
        }
        if (!this.checkBulkHoldStatus()) {
            this.helper.toastError('Only orders with same status can be updated in bulk.');
            event.target.value = 'select'
            return;
        }
        let rod = this.rods.find(x => x.checked);
        if (rod.status == event.target.value) {
            event.target.value = 'select'
            return
        }
        let bulkRods = this.rods.filter(element => {
            if (element.checked) {
                return element;
            }
        })
        let hold = rod.on_hold;
        let to = event.target.value;
        let status = rod.status;
        if (event.target.value == 'On Hold') {
            hold = true;
            to = event.target.value;
            status = rod.status;
        } else if (event.target.value == 'Off Hold') {
            hold = false;
            to = status;
        } else if (event.target.value != 'On Hold' && event.target.value != 'On Hold' && hold) {
            hold = false;
        } else {
            hold = false;
            status = event.target.value;
        }
        let modalData = {
            hold: hold,
            from: rod.on_hold ? 'On Hold' : rod.status,
            to: rod.on_hold ? 'Off Hold' : to,
            model: bulkRods,
            status: status
        }
        this.modalConfig.windowClass = "modal-roles change-status-modal";
        const statusModal = this._modal.open(UpdateStatusComponent, this.modalConfig);
        statusModal.componentInstance.data = modalData;
        statusModal.componentInstance.type = 'bulk';
        statusModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.rodListing();
            }
            event.target.value = 'select'
            statusModal.dismiss();
            this.modalConfig.windowClass = "modal-roles";
        });
    }

    checkBulkStatus() {
        let status = '';
        let check = true;
        this.rods.forEach(element => {
            if (element.checked && status == '') {
                status = element.status;
            }
            if (element.status != status && element.checked && status != '') {
                check = false;
            }
        });
        return check;
    }

    checkBulkHoldStatus() {
        let check = true;
        let hold;
        this.rods.forEach(element => {
            if (element.checked && hold == undefined) {
                hold = element.on_hold;
            }
            if (element.on_hold != hold && element.checked && hold != undefined) {
                check = false;
            }
        });
        return check;
    }

    searchRod() {
        // if (this.searchParams.search.length == 0 || this.searchParams.search.length >= 3) {
            this.searchParams.page = 1;
            this.rodListing();
        // }
    }

    changePage(event) {
        console.log(event);
        this.searchParams.page = event;
        this.rodListing();
    }

    ChangePageSize(event) {
        console.log(event);
        this.searchParams.page = 1;
        this.searchParams.page_size = event;
        this.rodListing();
    }
    completeOrder(rod, index) {
        if (parseInt(rod.progress) < 100 || rod.status != 'Delivered') {
            this.helper.toastError('Cannot complete order because it is still in production');
            return;
        }
        let modalData = {
            hold: rod.on_hold,
            from: rod.status,
            to: 'Completed',
            model: [rod],
            status: 'Completed'
        }
        this.modalConfig.windowClass = "modal-roles change-status-modal";
        const statusModal = this._modal.open(UpdateStatusComponent, this.modalConfig);
        statusModal.componentInstance.data = modalData;
        statusModal.componentInstance.response.subscribe(res => {
            if (res.success) {
                this.rods.splice(index, 1);
            }
            statusModal.dismiss();
        });

    }

    addMultipleJobNote() {

        const modal = this._modal.open(AddMultipleJobNotesComponent, this.modalConfig);
        modal.componentInstance.data = this.rods;
        modal.componentInstance.response.subscribe(response => {
            if (response.success) {
                let payload = response.data;
                this._rod.addMultipleJobNote(payload).subscribe(res => {
                    this.helper.toastSuccess(res.message);
                    this.rodListing();
                    modal.dismiss();
                });

            } else modal.dismiss();
        });
    }

    downloadData(type) {
        this.searchParams['type'] = type;
        this._rod.downloadData(this.searchParams).subscribe(res => {
            window.open(res.data.link);
        })
    }

    sortData(column) {
        this.searchParams.sort_column = column;
        this.searchParams.sort_value = this.searchParams.sort_value == 'ASC' ? 'DESC' : 'ASC';
        console.log(this.searchParams);

        this.rodListing();
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
