import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { GlobalHelper } from '../shared/services/globalHelper';

@Directive({
    selector: '[appDragnDrop]'
})
export class DragnDropDirective {

    @Output() filesDropped: EventEmitter<any> = new EventEmitter();

    @HostListener('dragover', ['$event']) onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = true;
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = false;
    }

    @HostListener('drop', ['$event']) onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files
        let validFiles = ['jpeg', 'jpg', 'png', 'pdf', 'csv', 'xlsx', 'xls', 'docx', 'doc', 'pptx', 'ppt'];
        let f = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            let ext = element.name.split('.')[element.name.split('.').length - 1]
            if (!validFiles.includes(ext)) {
                this.helper.toastError(`Unsupported file .${ext}`)
            } else if (element.size > 5000000) {
                this.helper.toastError(`Attachment must be less than 5MB`);
            } else f.push(element);
        }
        if (f.length > 0) {
            this.filesDropped.emit(f);
        }
        this.fileOver = false;
    }

    @HostBinding('class.fileOver') fileOver: boolean;
    constructor(private helper: GlobalHelper) { }

}
