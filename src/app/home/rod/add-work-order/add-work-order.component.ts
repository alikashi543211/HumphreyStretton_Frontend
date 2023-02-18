import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEditCustomerComponent } from 'src/app/components/modals/rod/add-edit-customer/add-edit-customer.component';
import { ImportPreviewComponent } from 'src/app/components/modals/rod/import-preview/import-preview.component';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-add-work-order',
    templateUrl: './add-work-order.component.html',
    styleUrls: ['./add-work-order.component.css']
})
export class AddWorkOrderComponent implements OnInit {

    @ViewChild('inputQuotation') inputQuotation;

    products: any = [];
    selectedProducts = [];
    customers = [];
    salePersons = [];
    employees = [];
    dateToday = new Date();
    workOrder = {
        products: this.selectedProducts,
        customer_id: 0,
        location: '',
        contract: '',
        fsc: false,
        order_number: null,
        sage_customer_id: '',
        schedule_ref: '',
        description: '',
        delivery_fee: '0',
        total_value: 0,
        settlement_due_days: 30,
        settlement_discount: 0,
        settlement_discount_amount: 0,
        straight_discount_description: '',
        straight_discount: 0,
        straight_discount_amount: 0,
        employee_id: 0,
        scheduler_id: null,
        due_date: '',
        quotation_id: null,
        // is_sage_invoice_auto: false
    }
    totalValue = 0;
    modalConfig = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true,
        windowClass: "modal-roles"
    };
    quotationData = null;
    straightDiscount: boolean = false;
    settlementDiscount: boolean = false;
    updateOrder: any;
    currentDate = new Date();
    customerInput = false;
    employeeInput = false;
    schedulerInput = false;
    isManualInvoice = false;
    customerName = '';
    selectedCustomer;
    selectedEmployee;
    selectedScheduler;
    employeeName = '';
    scheduler = '';
    searchSubscription: Subscription;
    sageCustomers;
    sageCustomerInput = false;
    sageCustomerName = '';
    selectedsageCustomer;
    sageCustomerId;
    showSageSearch = false;
    constructor(private _rod: RodService, private helper: GlobalHelper, private _modal: NgbModal, private datePipe: DatePipe, private _location: Location, private router: Router) { }

    ngOnInit(): void {
        this.getProductsListing();
        this.getCustomerListing();
        this.getEmployeeListing();
    }


    getEmployeeListing() {
        this._rod.getEmployeeListing().subscribe((res: any) => {
            this.employees = res.data.data;
            this.salePersons = res.data.data;
        })
    }
    getProductsListing() {
        this._rod.productsListing().subscribe((res: any) => {
            this.products = res.data
        })
    }

    getCustomerListing() {
        this._rod.getCustomersListing().subscribe((res: any) => {
            this.customers = res.data.data
        })
    }

    addSalesOrder() {
        if (this.validateAddForm()) {
            if (this.quotationUploaded()) {
                this.workOrder.quotation_id = this.quotationData.quotation_id
            } else this.workOrder.quotation_id = null;
            this._rod.storeWorkOrder(this.workOrder).subscribe(res => {
                this.helper.toastSuccess(res.message);
                this.router.navigate(['rod']);
            })
        }
    }

    selectProduct(event: any,) {
        let p = this.products[event.target.value];
        event.target.value = 'select';
        if (!this.selectedProducts.find((x: any) => x.id == p.id)) {
            this.selectedProducts.push({
                id: p.id,
                name: p.name,
                quantity: '',
                value: 0
            });
        }
    }

    searchCustomer(event) {
        if (event.target.value.length >= 3 || event.target.value.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe()
            this.searchSubscription = this._rod.getCustomersListing({ search: event.target.value }).subscribe(res => {
                this.customers = res.data.data;
            })
        }
    }

    searchSalePerson(event) {
        if (event.target.value.length >= 3 || event.target.value.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe()
            this.searchSubscription = this._rod.getEmployeeListing({ search: event.target.value }).subscribe(res => {
                this.salePersons = res.data.data;
            })
        }
    }

    searchEmployee(event) {
        if (event.target.value.length >= 3 || event.target.value.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe()
            this.searchSubscription = this._rod.getEmployeeListing({ search: event.target.value }).subscribe(res => {
                this.employees = res.data.data;
            })
        }
    }

    searchSageCustomer(event) {
        if (event.target.value.length >= 3 || event.target.value.length == 0) {
            if (this.searchSubscription) this.searchSubscription.unsubscribe()
            this.searchSubscription = this._rod.searchSageCustomerId({ search: event.target.value }).subscribe(res => {
                this.sageCustomers = res.data;
            })
        }
    }

    removeProduct(index: number) {
        if (this.selectedProducts.length == 2 && !this.checkQuotationUpload()) {
            this.quotationData = null
        }
        this.selectedProducts.splice(index, 1);
        this.calculateValue();
    }

    selectCustomer(value) {
        if (value == 'new') {
            const modal = this._modal.open(AddEditCustomerComponent, this.modalConfig)
            modal.componentInstance.response.subscribe(res => {
                if (res.success) {
                    this.customers.push(res.data)
                    this.workOrder.customer_id = res.data.id;
                    this.selectedCustomer = res.data;
                    this.customerName = res.data.name
                    this.sageCustomerId = '';
                    this.showSageSearch = true;
                }
                modal.dismiss();
            })
        } else {
            this._rod.getSageCustomerId({id: value.id}).subscribe(res => {
                if(res.data) {
                    this.workOrder.sage_customer_id = res.data;
                    this.sageCustomerId = res.data;
                    this.showSageSearch = false;
                    this.sageCustomerName = '';
                    this.sageCustomers = [];
                    this.selectedsageCustomer = {};
                }else {
                    this.sageCustomerId = '';
                    this.showSageSearch = true;
                }
            })
            this.workOrder.customer_id = value.id
            this.selectedCustomer = value
            this.customerName = value.name;
        }
        this.customerInputOut();
    }

    selectEmployee(value) {
        this.workOrder.employee_id = value.id
        this.selectedEmployee = value
        this.employeeName = value.name
        this.employeeInputOut();
    }

    selectSageCustomer(value) {
        // this.workOrder.employee_id = value.id
        this.workOrder.sage_customer_id = value.accountRef;
        this.sageCustomerId = value.accountRef;
        this.selectedsageCustomer = value
        this.sageCustomerName = value.name
        this.sageCustomerInputOut();
    }

    selectScheduler(value) {
        this.workOrder.scheduler_id = value.id
        this.selectedScheduler = value;
        this.scheduler = value.name;
        this.schedulerInputOut();
    }

    calculateValue() {
        // if (this.quotationUploaded()) {
        //     return;
        // }
        let value = 0;
        this.selectedProducts.forEach(element => {
            value += (element.value ? parseFloat(element.value) : 0);
        });
        this.totalValue = value + (this.workOrder.delivery_fee ? parseFloat(this.workOrder.delivery_fee) : 0);
        this.calculateDiscount();
    }

    validateAddForm() {
        if (!this.workOrder.products.length) {
            this.helper.toastError('Please select product');
            return false;
        }
        if (!this.workOrder.customer_id) {
            this.helper.toastError('Please select customer');
            return false;
        }
        if (!this.workOrder.employee_id) {
            this.helper.toastError('Please select sales person');
            return false;
        }
        if (!this.workOrder.contract.length) {
            this.helper.toastError('Please enter contract details');
            return false;
        }
        // if (this.workOrder.order_number && this.workOrder.order_number.length > 0 && isNaN(this.workOrder.order_number)) {
        //     this.helper.toastError('Please enter correct Order Number');
        //     return false;
        // }
        if (!this.workOrder.location.length) {
            this.helper.toastError('Please enter location');
            return false;
        }
        return true;
    }

    validateUpdateForm() {
        if (!this.updateOrder.product_id) {
            this.helper.toastError('Please select product');
            return false;
        }
        if (!this.updateOrder.quantity) {
            this.helper.toastError('Please enter product quantity');
            return false;
        }
        if (!this.updateOrder.contract.length) {
            this.helper.toastError('Please enter contract details');
            return false;
        }
        if (!this.updateOrder.order_number.length) {
            this.helper.toastError('Please enter customer order number');
            return false;
        }
        if (!this.updateOrder.location.length) {
            this.helper.toastError('Please enter location');
            return false;
        }
        return true;
    }

    customerInputOut() {
        setTimeout(() => {
            this.customerInput = false
            this.customerName = this.selectedCustomer?.name;
            if (this.customers.length == 0) {
                if (this.searchSubscription) this.searchSubscription.unsubscribe()
                this.searchSubscription = this._rod.getCustomersListing({ search: '' }).subscribe(res => {
                    this.customers = res.data.data;
                })
            }
        }, 200);
    }
    employeeInputOut() {
        setTimeout(() => {
            this.employeeInput = false
            this.employeeName = this.selectedEmployee?.name;
            if (this.salePersons.length == 0) {
                if (this.searchSubscription) this.searchSubscription.unsubscribe()
                this.searchSubscription = this._rod.getEmployeeListing({ search: '' }).subscribe(res => {
                    this.salePersons = res.data.data;
                })
            }
        }, 200);
    }
    sageCustomerInputOut() {
        setTimeout(() => {
            this.sageCustomerInput = false
            this.sageCustomerName = this.selectedsageCustomer?.name;
            if (this.sageCustomers.length == 0) {
                if (this.searchSubscription) this.searchSubscription.unsubscribe()
                this.searchSubscription = this._rod.searchSageCustomerId({ search: '' }).subscribe(res => {
                    this.sageCustomers = res.data;
                })
            }
        }, 200);
    }
    schedulerInputOut() {
        setTimeout(() => {
            this.schedulerInput = false;
            this.scheduler = this.selectedScheduler?.name;
            if (this.employees.length == 0) {
                if (this.searchSubscription) this.searchSubscription.unsubscribe()
                this.searchSubscription = this._rod.getEmployeeListing({ search: '' }).subscribe(res => {
                    this.employees = res.data.data;
                })
            }
        }, 200);
    }

    dateChanged(event) {
        this.workOrder.due_date = this.datePipe.transform(event, 'YYYY-MM-dd')
    }
    quotationUploaded() {
        if (this.checkQuotationUpload() && this.quotationData) {
            return true
        }
        return false;
    }
    checkQuotationUpload() {
        if (this.selectedProducts.length == 2 && this.selectedProducts.find(x => x.id == 1) != undefined && this.selectedProducts.find(x => x.id == 2) != undefined) {
            return true
        }
        return false;
    }
    calculateDiscount() {
        // if (this.quotationUploaded()) {
        //     return;
        // }
        if (this.workOrder.total_value) {

            let totalValue = this.totalValue;
            let discount = 0, straight=0;
            if (this.settlementDiscount && this.workOrder.settlement_discount) {
                discount += parseFloat(((this.workOrder.settlement_discount / 100) * totalValue).toFixed(2))
            }
            if (this.straightDiscount && this.workOrder.straight_discount) {
                straight += parseFloat(((this.workOrder.straight_discount / 100) * totalValue).toFixed(2))
            }
            this.workOrder.settlement_discount_amount = discount;
            this.workOrder.straight_discount_amount = straight;
            this.workOrder.total_value = parseFloat((totalValue - straight).toFixed(2));
            // this.workOrder.total_value = parseFloat((totalValue - discount).toFixed(2));
        } else this.workOrder.total_value = parseFloat(this.totalValue.toFixed(2));
    }

    selectQuotation(event) {
        const element = event.target.files[0];
        let validFiles = ['xlsx', 'csv', 'xls', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.ms-excel'];
        if (!validFiles.includes(element.type.split('/')[1])) {
            this.helper.toastError(`Unsupported file .${element.type.split('/')[1]}`);
            event.target.files = null;
            return;
        } else if (element.size > 10000000) {
            this.helper.toastError(`Attachment must be less than 5MB`);
            event.target.files = null;
            return;
        }
        let formData = new FormData();
        formData.set('quotation', element, element.name);
        this.inputQuotation.nativeElement.value = '';
        this._rod.quotationImport(formData).subscribe(res => {
            this.confirmPreview(res.data);
            event.target.files = null;
        }, err => {
            event.target.files = null;
        })
    }

    confirmPreview(importOrder) {
        this.modalConfig.windowClass = "modal-roles job-notes-modal"
        const importPreviewModal = this._modal.open(ImportPreviewComponent, this.modalConfig);
        importPreviewModal.componentInstance.importOrder = importOrder;
        importPreviewModal.componentInstance.response.subscribe((res) => {
            if (res.success) {
                importPreviewModal.dismiss();
                this.modalConfig.windowClass = "modal-roles";
                this.setQutationData(importOrder);
            }
            if (!res.success) {
                importPreviewModal.dismiss();
                this.modalConfig.windowClass = "modal-roles";
            }
        });
    }

    setQutationData(data) {
        this.quotationData = data;
        let quotation = data;
        let frame = this.workOrder.products.find(x => x.name == 'Frame');
        let door = this.workOrder.products.find(x => x.name == 'Doors');
        frame.quantity = quotation.total_frame_quantity;
        frame.value = quotation.total_frame_value;
        door.quantity = quotation.total_door_quantity;
        door.value = quotation.total_door_value;
        this.workOrder.contract = quotation.contract;
        this.workOrder.delivery_fee = quotation.delivery_fee;
        this.workOrder.total_value = this.totalValue = parseFloat(quotation.total_value);
        this.workOrder.quotation_id = quotation.quotation_id;
        this.workOrder.settlement_discount = quotation.discount_percentage;
        this.workOrder.settlement_discount_amount = quotation.discount_amount;
        this.workOrder.description = quotation.full_description;
        if(this.workOrder.settlement_discount > 0) {
            this.settlementDiscount = true;
        }
        this.calculateValue();

    }

    updateManualInvoice(event) {
        // this.workOrder.is_sage_invoice_auto = event.target.checked;
        this.isManualInvoice = event.target.checked;
    }

    cancel(): void {
        this.router.navigate(['rod']);
    }
}
