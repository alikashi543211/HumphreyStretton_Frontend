import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Input() totalPages = 1;
    @Input() currentPage = 1;
    @Input() pageSize = 10;
    @Input() from = 1;
    @Input() to = 10;
    @Input() total = 10;
    @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
    @Output() ChangePageSize: EventEmitter<number> = new EventEmitter<number>();
    constructor() { }

    ngOnInit(): void {
    }


    nextPage() {
        if (this.currentPage == this.totalPages) {
            return;
        }
        this.currentPage++
        this.changePage.emit(this.currentPage);
    }

    prevPage() {
        if (this.currentPage == 1) {
            return;
        }
        this.currentPage--
        this.changePage.emit(this.currentPage);
    }

    pageSizeUpdate(event) {

        this.pageSize = event.target.value;
        this.ChangePageSize.emit(this.pageSize);
    }
}
