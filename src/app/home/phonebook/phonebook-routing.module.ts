import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { InternalListComponent } from './internal-list/internal-list.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const phonebookRoutes: Routes = [
    {
        path: '',
        redirectTo: 'customers'
    },
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'suppliers',
        component: SuppliersComponent
    },
    {
        path: 'internal-list',
        component: InternalListComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(phonebookRoutes)],
    exports: [RouterModule]
})
export class PhonebookRoutingModule { }
