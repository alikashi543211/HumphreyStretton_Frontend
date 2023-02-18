import { DatePipe } from '@angular/common';
import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { title } from 'process';
import { DeliveryListService } from 'src/app/shared/services/deliveryList.service';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-update-delivery-order',
    templateUrl: './update-delivery-order.component.html',
    styleUrls: ['./update-delivery-order.component.css']
})
export class UpdateDeliveryOrderComponent implements OnInit {
    @Input() order;
    @Output() response: EventEmitter<any> = new EventEmitter();
    products = [];
    tags = [];
    orderDate;
    deliveryTagInput: boolean = false
    tagInput = '';
    constructor(private _rod: RodService, private _delivery: DeliveryListService, private datePipe: DatePipe) {
    }

    ngOnInit(): void {

        this.orderDate = new Date(this.order.due_date)
        this.getProductsListing();
        this.deliveryTagListing();
    }

    getProductsListing() {
        this._rod.productsListing().subscribe(res => {
            this.products = res.data;
        })
    }
    filteredTags() {
        let tags = this.tags.filter(element => {
            if (this.tagInput.length == 0 || element.title.includes(this.tagInput)) {
                return element;
            }
        })
        if (tags.length > 0) {
            this.deliveryTagInput = true;
        }
        return tags;

    }
    deliveryTagListing() {
        this._delivery.deliveryTagListing().subscribe(res => {
            this.tags = res.data;
        })
    }

    close() {
        this.response.emit({ success: false });
    }
    deliveryInputOut() {
        setTimeout(() => {
            this.deliveryTagInput = false
        }, 200);
    }
    updateOrder() {
        let tags = []
        this.order.delivery_tags.forEach(element => {
            tags.push(element.title);
        });
        let order = JSON.parse(JSON.stringify(this.order));
        order.delivery_tags = tags;
        this._delivery.updateDeliveryList(order).subscribe(res => {
            this.response.emit({ success: true, data: res.data })
        });
    }

    selectTag(tag) {
        if (this.order.delivery_tags.find(x => x.title == tag.title) == undefined) {
            this.order.delivery_tags.push(tag);
        }
    }

    addTag(event) {
        console.log(event, this.tagInput);
        if (event.keyCode == 13 && this.tagInput.length>0) {
            if (this.order.delivery_tags.find(x => x.title == this.tagInput) == undefined) {
                this.order.delivery_tags.push({ title: this.tagInput });
            }
            if (this.tags.find(x => x.title == this.tagInput) == undefined) {
                this.tags.push({ title: this.tagInput });
            }
            this.tagInput = '';
        }
    }

    removeTag(index) {
        this.order.delivery_tags.splice(index, 1);
    }

    dateChanged(value) {
        this.order.due_date = this.datePipe.transform(value, 'YYYY-MM-dd');
    }
}
