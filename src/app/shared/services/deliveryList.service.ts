import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class DeliveryListService {


    constructor(private http: HttpClient) {
    }

    listing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deliveryListing}`, params);
    }

    updateDeliveryListStatus(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateDeliveryListStatus}`, params);
    }

    updateDeliveryList(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateDeliveryList}`, params);
    }

    downloadData(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.downloadDeliveryList}`, params);
    }

    storageListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.storageListing}`, params);
    }
    updateStorage(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateStorage}`, params);
    }
    updateDeliveryListOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateDeliveryListOrder}`, params);
    }

    loadAnalytics(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.loadAnalytic}`, params);
    }

    deliveryTagListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deliveryTagsListing}`, params);
    }

}
