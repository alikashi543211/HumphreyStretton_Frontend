import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { HistoryComponent } from './history/history.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';

const fscRoutes: Routes = [

    {
        path: '',
        redirectTo: 'customer-orders'
    },
    {
        path: 'customer-orders',
        component: CustomerOrderComponent
    },
    {
        path: 'purchase-orders',
        component: PurchaseOrderComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(fscRoutes)],
    exports: [RouterModule]
})
export class FscRoutingModule { }
