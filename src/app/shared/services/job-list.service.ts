import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class JobListService {


    constructor(private http: HttpClient) {
    }

    jobListListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.jobListListing}`, params);
    }

    updateJobList(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateJobList}`, params);
    }

    detailJobList(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.detailJobList}`, params);
    }

    quotationImport(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.uploadJobListQuotation}`, params);
    }
}
