import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class FscService {


    constructor(private http: HttpClient) {
    }

    listing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.fscListing}`, params);
    }


    purchaseOrderListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.purchaseOrderListing}`, params);
    }

    addPurchaseOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.addPurchaseOrder}`, params);
    }

    updateOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateOrder}`, params);
    }

    deleteOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deleteOrder}`, params);
    }

    ordersListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.fscWorkOrderListing}`, params);
    }

    supplierListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.fscSupplierListing}`, params);
    }

    downloadPurchaseOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.fscPurchaseOrderDownload}`, params);
    }
    downloadCustomerOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.fscCustomerOrderDownload}`, params);
    }

    history(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.fscHistory}`, params);
    }
    updateStatus(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.fscComplete}`, params);
    }
}
