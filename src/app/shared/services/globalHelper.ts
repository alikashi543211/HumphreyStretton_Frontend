import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalHelper {


    constructor(private _toast: ToastrService, private http: HttpClient) {
        // 
    }

    
    // test = new BehaviorSubject({});
    private notificationDetail = new BehaviorSubject({});
    currentNotification = this.notificationDetail.asObservable();

  
    sendNotificationDetail(detail) {
        this.notificationDetail.next(detail)
    }

    validateEmailAddress(email: any): boolean {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    clearLocalStorage() {
        localStorage.clear();
        return true;
    }

    toastSuccess(message: any): void {
        this._toast.success('', message);
    }
    toastError(message: any): void {
        if (Array.isArray(message)) {
            this._toast.error(message[0]);
        } else {
            this._toast.error(message);
        }
    }

    detectExtensionInChrome(elRef) {
        return this.http
            .get(`chrome-extension://hdhinadidafjejdhmfkjgnolgimiaplp/js/page/google-doc.js`, { observe: 'response', responseType: 'json' })
            .subscribe(response => {
                if (response) {
                }
            },
                error => {
                    if (error == 'OK') {
                    } else {
                        window.open('https://chrome.google.com/webstore/detail/read-aloud-a-text-to-spee/hdhinadidafjejdhmfkjgnolgimiaplp/related?hl=en');
                    }
                });
    }
    
    detectExtensionInMozilla(elRef) {
    }

    checkNotification(component, module, array, res) {
        // console.log('check notification called',component,module, array);
        // this.currentNotification.subscribe(res => {
            // console.log('res in',component,module, array, res);
            if(res && res['component'] == component) {
                if(res['module'] == module) {
                    if(res['type'] == 'Created') {
                        array = [JSON.parse(res['body']), ...array];
                        return  true;
                    }else if(res['type'] == 'Updated') {
                        array = this.updateArrayForNotification(JSON.parse(res['body']), 'update', array, component);
                        return false;
                    }else if(res['type'] == 'Deleted') {
                        array = this.updateArrayForNotification(JSON.parse(res['body']), 'delete', array, component);
                        return  false;
                    }else {return false}
                    // console.log('array', array)
                }else {return false}
            }else{return false;}
        // })
    }

    updateArrayForNotification(data, action, array, component) {
        // console.log('update notification', data, action);
        for(let i=0; i<array.length; i++) {
            if(array[i]['id'] == data.id) {
                if(action == 'update') {
                    array[i] = data;
                    if(array[i].due_date && component == 'delivery') {
                        array[i].due_date = new Date(array[i].due_date);
                        console.log('update notification', array);
                    }
                    return array;
                }else if(action == 'delete') {
                    array.splice(i, 1);
                    return array;
                }
            }
        }
    }

}
