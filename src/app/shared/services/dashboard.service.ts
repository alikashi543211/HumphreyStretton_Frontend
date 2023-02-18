import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {


    constructor(private http: HttpClient) {
    }

    // Accounts
    dashboardStats(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.dashboardStats}`, params);
    }

    dashboardCharts(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.dashboardCharts}`, params);
    }
}
