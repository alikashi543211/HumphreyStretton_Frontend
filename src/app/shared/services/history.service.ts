import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {


    constructor(private http: HttpClient) {
    }

    listing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.historyListing}`, params);
    }

    reorder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.historyReorder}`, params);
    }

    downloadHistory(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.historyDownload}`, params);
    }
}
