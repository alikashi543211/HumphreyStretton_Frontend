import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-add-multiple-job-notes',
    templateUrl: './add-multiple-job-notes.component.html',
    styleUrls: ['./add-multiple-job-notes.component.css']
})
export class AddMultipleJobNotesComponent implements OnInit {
    @Input() data = [];
    @Output() response: EventEmitter<any> = new EventEmitter();
    payload = {
        ids: [],
        title: '',
        description: ''
    };
    orders = [];
    constructor() { }

    ngOnInit(): void {
        this.data.forEach(element => {
            if (element.checked) {
                this.orders.push(element);
                this.payload.ids.push(element.id);
            }
        })
    }

    cancel() {
        this.response.emit({ success: false });
    }

    addJobNote() {
        this.response.emit({ success: true, data: this.payload });
    }

}
