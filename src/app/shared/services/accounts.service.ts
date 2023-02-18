import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { urls } from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class AccountService {


    constructor(private http: HttpClient) {
    }

    // Accounts
    accountStats(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountStats}`, params);
    }

    customerTotals(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.customerTotals}`, params);
    }

    customersListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.salesOrdersCustomerListing}`, params);
    }

    salesOrdersRodListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.salesOrdersRodListing}`, params);
    }

    salesOrders(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.salesOrdersListing}`, params);
    }

    deleteSaleOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deleteSalesOrder}`, params);
    }

    addSalesOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.addSalesOrder}`, params);
    }

    updateSaleOrderStatus(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateSalesOrderStatus}`, params);
    }
    updateSaleOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateSalesOrder}`, params);
    }

    fixedCostListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.fixedCostListing}`, params);
    }

    addFixedCost(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.addFixedCost}`, params);
    }

    updateFixedCost(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateFixedCost}`, params);
    }

    deleteFixedCost(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deleteFixedCost}`, params);
    }

    creditCheckListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.creditCheckListing}`, params);
    }

    accountsPurchaseOrdersListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountsPurchaseOrdersListing}`, params);
    }

    addPurchaseOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.addAccountsPurchaseOrder}`, params);
    }
    updatePurchaseOrderStatus(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateAccountsPurchaseOrderStatus}`, params);
    }
    updatePurchaseOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.updateAccountsPurchaseOrder}`, params);
    }
    deletePurchaseOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.deletePurchaseOrder}`, params);
    }

    usersListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountsUserListing}`, params);
    }

    workOrderListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountsWorkOrdersListing}`, params);
    }

    supplierListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountsSupplierListing}`, params);
    }

    downloadSalesOrder(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountsDownloadSalesOrder}`, params);
    }

    dowloadMonthlyCost(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountsDowloadMonthlyCost}`, params);
    }

    downloadCustomerTotal(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountsDownloadCustomerTotal}`, params);
    }


    storageListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.accountsStorageListing}`, params);
    }

    sageInvoiceListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.sageInvoiceListing}`, params);
    }

    sageInvoiceVerification(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.sageInvoiceVerification}`, params);
    }

    sageResendInvoiceListing(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.sageResendInvoiceListing}`, params);
    }
    sageInvoiceCreate(params = {}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + urls.sendSageInvoice}`, params);
    }
}
