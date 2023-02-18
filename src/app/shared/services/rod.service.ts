import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class RodService {


    constructor(private http: HttpClient) {
    }

    rodListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.rodListing}`, params);
    }

    productsListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.productListing}`, params);
    }

    storeWorkOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.storeWorkOrder}`, params);
    }

    getWorkOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getWorkOrder}`, params);
    }

    getCustomerNumberOrders(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getCustomerOrders}`, params);
    }

    updateInvoiceNo(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateInvoiceNo}`, params);
    }

    updateWorkOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateWorkOrder}`, params);
    }

    getJobNotes(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getJobNotes}`, params);
    }

    getTimeline(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getJobNotes}`, params);
    }

    addJobNote(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.addJobNote}`, params);
    }

    deleteJobNote(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deleteJobNote}`, params);
    }

    getTicketNo(params = {}): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl + urls.getTicketNo}`);
    }

    addDevliveryNote(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.addDeliveryNote}`, params);
    }

    updateDeliveryNote(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateDeliveryNote}`, params);
    }

    getDeliveryNotes(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getDeliveryNotes}`, params);
    }

    multipleUpdateOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.multiOrderUpdate}`, params);
    }

    updateOrderStatus(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateOrderStatus}`, params);
    }

    bulkStatusUpdate(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.bulkStatusUpdate}`, params);
    }

    uploadProductionSchedule(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.uploadFiles}`, params);
    }

    removeProductionSchedule(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.removeFile}`, params);
    }

    addMultipleJobNote(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.multipleJobNotes}`, params);
    }

    getCustomersListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getWorkOrdersCustomers}`, params);
    }

    getEmployeeListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getWorkOrdersEmployees}`, params);
    }


    getRolesListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getJobNoteRoles}`, params);
    }

    downloadData(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.downloadRod}`, params);
    }

    quotationImport(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.quotationImport}`, params);
    }

    getSageCustomerId(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.getSageCustomerId}`, params);
    }

    searchSageCustomerId(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.searchSageCustomerId}`, params);
    }
}
