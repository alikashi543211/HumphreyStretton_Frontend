import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-import-preview',
    templateUrl: './import-preview.component.html',
    styleUrls: ['./import-preview.component.css']
})
export class ImportPreviewComponent implements OnInit {
    @Input() importOrder;
    @Output() response: EventEmitter<any> = new EventEmitter();
    order;
    constructor(private _rod: RodService, public _auth: AuthService, private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.order= this.importOrder;
    }

    cancel() {
        this.response.emit({ success: false});
    }

    confirm() {
        this.response.emit({ success: true});
    }

}
