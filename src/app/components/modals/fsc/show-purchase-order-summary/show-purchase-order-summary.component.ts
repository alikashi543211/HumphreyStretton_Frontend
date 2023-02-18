import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-purchase-order-summary',
  templateUrl: './show-purchase-order-summary.component.html',
  styleUrls: ['./show-purchase-order-summary.component.css']
})
export class ShowPurchaseOrderSummaryComponent implements OnInit {

  @Input() summary;
  @Output() response: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    console.log('summary', this.summary)
  }

  cancel() {
    this.response.emit({ success: false });
  }

}
