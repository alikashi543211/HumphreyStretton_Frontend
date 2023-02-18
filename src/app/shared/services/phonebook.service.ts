import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class PhonebookService {


    constructor(private http: HttpClient) {
    }

    customerListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.customerListing}`, params);
    }

    addCustomer(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.customerAdd}`, params);
    }

    updateCustomer(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.customerUpdate}`, params);
    }

    deleteCustomer(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.customerDelete}`, params);
    }

    customerOrdersPdfEmail(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.customerOrdersPdfEmail}`, params);
    }



    // Suppliers
    supplierListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.supplierListing}`, params);
    }

    addSupplier(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.supplierAdd}`, params);
    }

    updateSupplier(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.supplierUpdate}`, params);
    }

    deleteSupplier(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.supplierDelete}`, params);
    }

    employeesListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.employeeListing}`, params);
    }

    addEmployee(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.employeeAdd}`, params);
    }

    updateEmployee(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.employeeUpdate}`, params);
    }

    deleteEmployee(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.employeeDelete}`, params);
    }
}
