import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-view-credit-check-details',
    templateUrl: './view-credit-check-details.component.html',
    styleUrls: ['./view-credit-check-details.component.css']
})
export class ViewCreditCheckDetailsComponent implements OnInit {
    @Input() credits = [];
    @Output() response: EventEmitter<any> = new EventEmitter();
    total = 0;
    totals = [];
    constructor() { }

    ngOnInit(): void {
        this.calculateTotal();
    }

    calculateTotal() {
        this.credits.forEach(element => {
            if (element.checked) {
                this.total += Number(element.sale_order.value);
                if (!this.totals.find(x => x.name == element.customer.name)) {
                    this.totals.push({
                        name: element.customer.name,
                        value: Number(element.sale_order.value),
                        workNumber: element.work_number
                    })
                } else {
                    this.totals[this.totals.indexOf(this.totals.find(x => x.name == element.customer.name))].value += Number(element.sale_order.value)
                    this.totals[this.totals.indexOf(this.totals.find(x => x.name == element.customer.name))].workNumber += (', ' + element.work_number);
                }
            }

        });
        this.totals.forEach(element => {
            element.value = +element.value.toFixed(2)
        });
    }

    close() {
        this.response.emit({ success: true });
    }

}
