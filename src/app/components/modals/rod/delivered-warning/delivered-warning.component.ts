import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delivered-warning',
  templateUrl: './delivered-warning.component.html',
  styleUrls: ['./delivered-warning.component.css']
})
export class DeliveredWarningComponent implements OnInit {
  @Output() response: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.response.emit({ success: true });
  }

}
