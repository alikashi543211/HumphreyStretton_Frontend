import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status-delivered-confirmation',
  templateUrl: './status-delivered-confirmation.component.html',
  styleUrls: ['./status-delivered-confirmation.component.css']
})
export class StatusDeliveredConfirmationComponent implements OnInit {
  @Output() response: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.response.emit({ success: false });
  }

  proceed() {
    this.response.emit({ success: true });
  }

}
