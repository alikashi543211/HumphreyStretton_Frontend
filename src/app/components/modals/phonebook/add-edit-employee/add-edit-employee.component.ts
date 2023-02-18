import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdministrationService } from 'src/app/shared/services/administration.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { PhonebookService } from 'src/app/shared/services/phonebook.service';

@Component({
    selector: 'app-add-edit-employee',
    templateUrl: './add-edit-employee.component.html',
    styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
    @Input() type = 'add';
    @Input() employee;
    @Output() response: EventEmitter<any> = new EventEmitter();
    newEmployee = {
        name: '',
        role_id: null,
        email: '',
        phone_no: '',
        extension_number: '',
        external_contact: ''
    }
    roles = [];
    constructor(private _administration: AdministrationService, private helper: GlobalHelper, private _phonebook: PhonebookService) { }

    ngOnInit(): void {
        // this.getRoles();
    }

    getRoles() {
        this._administration.rolesListing().subscribe(res => {
            this.roles = res.data;
        });
    }

    cancel() {
        this.response.emit({ success: false });
    }

    addEmployee() {
        this._phonebook.addEmployee(this.newEmployee).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true });
        })
    }

    updateEmployee() {
        if (this.employee.role_id == 'null') {
            this.employee.role_id = null;
        }
        this._phonebook.updateEmployee(this.employee).subscribe(res => {
            this.helper.toastSuccess(res.message);
            this.response.emit({ success: true, data: res.data });
        });
    }

}
