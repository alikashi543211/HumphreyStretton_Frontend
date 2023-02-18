import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { CreditCheckComponent } from './credit-check/credit-check.component';
import { FixedCostComponent } from './fixed-cost/fixed-cost.component';
import { SageInvoicesComponent } from './sage-invoices/sage-invoices.component';
import { StorageComponent } from './storage/storage.component';

const accountRoutes: Routes = [
    {
        path: '',
        component: AccountsComponent
    },
    {
        path: 'credit-check',
        component: CreditCheckComponent
    },
    {
        path: 'fixed-cost',
        component: FixedCostComponent
    },
    {
        path: 'storage',
        component: StorageComponent
    },
    {
        path: 'sage-invoices',
        component: SageInvoicesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }
