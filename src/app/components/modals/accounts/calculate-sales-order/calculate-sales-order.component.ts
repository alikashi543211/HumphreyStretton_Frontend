import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/accounts.service';
import { FscService } from 'src/app/shared/services/fsc.service';

@Component({
  selector: 'app-calculate-sales-order',
  templateUrl: './calculate-sales-order.component.html',
  styleUrls: ['./calculate-sales-order.component.css']
})
export class CalculateSalesOrderComponent implements OnInit {

  orders = [];
  selectedOrders = [];
  orderInput: boolean = false;
  grandTotal = {
    total: 0,
    quantity: 0, 
    doors: 0, 
    frame: 0,
    other: 0,
    delivery_fee: 0
  };
  searchParams = {
    search: '',
    month: ''
    // customer_id: null
  };
  accountsMonth = new Date();
  searchSubscription: Subscription;
  @Output() response: EventEmitter<any> = new EventEmitter();
  @ViewChild('searchInput') searchInput: ElementRef;
  constructor(private _fsc: FscService, private _account: AccountService, private datePipe: DatePipe) {
    this.searchParams.month = this.datePipe.transform(this.accountsMonth, 'YYYY-MM');
  }

  ngOnInit(): void {
    this.getWorkOrders();
  }

  getWorkOrders(event = null) {
    let search = '';
    if (event) {
      search = event.target.value;
    }
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
    // this._account.salesOrdersRodListing(this.searchParams).subscribe(res => {
    this._account.salesOrders(this.searchParams).subscribe(res => {
      // console.log('res', res.data);
      this.orders = res.data.data;
      // console.log(this.orders);
    });
  }

  selectOrder(order) {
    this.searchInput.nativeElement.value = '';
    if (this.isExist(order)) {
    // if (this.selectedOrders.find(x => x.id == order.id)) {
      console.log('found it');
      return;
    } else {

      if (order.work_order?.quotation) {
        let j = 0;
        for (let i = 0; i < this.selectedOrders.length; i++) {
          if(this.selectedOrders[i]['quotation'] && this.selectedOrders[i]['quotation'] == order.work_order.quotation.id) {
            this.selectedOrders[i]['id'].push(order.id);
            this.selectedOrders[i]['work_number'].push(order.work_order.work_number);
            this.selectedOrders[i]['products'] = this.selectedOrders[i]['products'] + order.work_order.quantity;
            this.selectedOrders[i]['other'] = this.selectedOrders[i]['other'] + order.other;
            if (order.work_order?.product?.name == 'Doors') {
              this.selectedOrders[i]['Doors'] = this.selectedOrders[i]['Doors'] + order.value;
            } else if (order.work_order?.product?.name == 'Frame') {
              this.selectedOrders[i]['Frame'] = this.selectedOrders[i]['Frame'] + order.value;
            }
            this.selectedOrders[i]['total'] = this.selectedOrders[i].other + this.selectedOrders[i].delivery_fee + 
            this.selectedOrders[i].Doors + this.selectedOrders[i].Frame;
            j=1;
            this.calculateTotal();
            break;
          }
        }
        if(j==0) {
          this.addToSelectedOrders(order);
        }
      } else {
        this.addToSelectedOrders(order);
      }
    }
  }

  isExist(order) {
    for (let i = 0; i < this.selectedOrders.length; i++) {
      if(this.selectedOrders[i]['id'].find(y => y == order.id)) {
        return true;
      }
    }
    return false;
  }

  calculateTotal() {
    this.grandTotal = {
      total: 0,
      quantity: 0, 
      doors: 0, 
      frame: 0,
      other: 0,
      delivery_fee: 0
    };
    for (let i = 0; i < this.selectedOrders.length; i++) {
      this.grandTotal.total = +(this.grandTotal.total + this.selectedOrders[i]['total']).toFixed(2);
      this.grandTotal.quantity = +(this.grandTotal.quantity + this.selectedOrders[i]['products']).toFixed(2);
      this.grandTotal.delivery_fee = +(this.grandTotal.delivery_fee + this.selectedOrders[i]['delivery_fee']).toFixed(2);
      this.grandTotal.doors = +(this.grandTotal.doors + this.selectedOrders[i]['Doors']).toFixed(2);
      this.grandTotal.frame = +(this.grandTotal.frame + this.selectedOrders[i]['Frame']).toFixed(2);
      this.grandTotal.other = +(this.grandTotal.other + this.selectedOrders[i]['other']).toFixed(2);
    }
  }

  addToSelectedOrders(order) {
    let temp = {
      id: [order.id],
      work_number: [order.work_order?.work_number],
      products: order.work_order?.quantity,
      other: order.other,
      delivery_fee: 0,
      Doors: 0,
      Frame: 0
    }
    if(order.work_order?.quotation?.delivery_fee) {
      temp['delivery_fee'] = order.work_order?.quotation.delivery_fee;
    }
    if (order.work_order?.product?.name == 'Doors') {
      temp['Doors'] = order.value;
    } else if (order.work_order?.product?.name == 'Frame') {
      temp['Frame'] = order.value;
    }
    if(order.work_order?.quotation) {
      temp['quotation'] = order.work_order?.quotation.id;
    }
    temp['total'] = temp.other + temp.delivery_fee + temp.Doors + temp.Frame;
    this.selectedOrders.push(temp);
    this.calculateTotal();
  }

  orderInputOut() {
    console.log('input out');
    setTimeout(() => {
      this.orderInput = false;
      document.getElementById('add-modalId').style.minHeight = 'unset';
      if (this.searchSubscription) this.searchSubscription.unsubscribe();
      if(this.searchInput.nativeElement.value.length == 0 && this.searchParams.search.length > 0) {
        this.searchParams.search = '';
        this.searchSubscription = this._account.salesOrders(this.searchParams).subscribe(res => {
          this.orders = res.data.data;
        })
      }
    }, 200);
  }

  focusInput() {
    console.log('check');
    document.getElementById('add-modalId').style.minHeight = '50vh';
  }

  searchOrder(event) {
    let search = '';
    if (event) {
      this.searchParams.search = event.target.value;
      search = event.target.value;
    }
    // if (search.length >= 3 || search.length == 0) {
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
    this.searchSubscription = this._account.salesOrders(this.searchParams).subscribe(res => {
    // this.searchSubscription = this._account.salesOrdersRodListing(this.searchParams).subscribe(res => {
      this.orders = res.data.data;
    })
    // }
  }

  removeOrder(i) {
    // this.selectedOrders.splice(index, 1);
    // this.grandTotal = this.grandTotal - this.selectedOrders[index]['total'];
    this.grandTotal.total = +(this.grandTotal.total - this.selectedOrders[i]['total']).toFixed(2);
      this.grandTotal.quantity = +(this.grandTotal.quantity - this.selectedOrders[i]['products']).toFixed(2);
      this.grandTotal.delivery_fee = +(this.grandTotal.delivery_fee - this.selectedOrders[i]['delivery_fee']).toFixed(2);
      this.grandTotal.doors = +(this.grandTotal.doors - this.selectedOrders[i]['Doors']).toFixed(2);
      this.grandTotal.frame = +(this.grandTotal.frame - this.selectedOrders[i]['Frame']).toFixed(2);
      this.grandTotal.other = +(this.grandTotal.other - this.selectedOrders[i]['other']).toFixed(2);
    this.selectedOrders.splice(i, 1);
  }

  cancel() {
    this.response.emit({ success: false });
  }

}
