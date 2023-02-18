import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalHelper } from 'src/app/shared/services/globalHelper';
import { RodService } from 'src/app/shared/services/rod.service';

@Component({
    selector: 'app-add-job-notes',
    templateUrl: './add-job-notes.component.html',
    styleUrls: ['./add-job-notes.component.css']
})
export class AddJobNotesComponent implements OnInit {
    @Input() orderId;
    @Input() module = 'rod';
    @Output() response: EventEmitter<any> = new EventEmitter();
    jobNotes = [];
    notify = [
        {
            id: 1,
            status: false,
            title: 'Director'
        },
        {
            id: 4,
            status: false,
            title: 'Accounts'
        },
        {
            id: 5,
            status: false,
            title: 'Basic'
        }
    ];
    currentPage = 1;
    nextPage: boolean = false;
    newNote = {
        title: '',
        description: '',
        work_order_id: 0,
        notify: []
    }
    constructor(private _rod: RodService, public _auth: AuthService, private helper: GlobalHelper) { }

    ngOnInit(): void {
        this.newNote.work_order_id = this.orderId;
        this.getJobNotes();
    }

    cancel() {
        this.response.emit({ success: false, close: true });
    }

    getJobNotes(next = false) {
        if (next) {
            this.currentPage++;
        }
        this._rod.getJobNotes({ work_order_id: this.orderId, page: this.currentPage }).subscribe(res => {
            res = res.data
            this.jobNotes = [...this.jobNotes, ...res.data];
            this.nextPage = res.next_page_url ? true : false;
        })
    }

    addJobNote() {
        this.newNote.notify = [];
        this.notify.forEach(element => {
            if (element.status)
                this.newNote.notify.push(element.id);
        })
        this._rod.addJobNote(this.newNote).subscribe(res => {
            this.jobNotes.push(res.data);
            this.helper.toastSuccess(res.message);
            this.newNote.description = '';
            this.newNote.title = '';
            this.response.emit({ success: true, close: true });
        })
    }

    deleteJobNote(id, index) {
        this._rod.deleteJobNote({ id: id }).subscribe(res => {
            this.jobNotes.splice(index, 1);
            if (res.data.job_notes_count <= 10) {
                this.nextPage = false;
            }
            this.response.emit({ success: true, close: false, data: res.data });
        })
    }

}
