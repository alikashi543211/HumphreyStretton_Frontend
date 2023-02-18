import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { FixedCostComponent } from './fixed-cost/fixed-cost.component';
import { CreditCheckComponent } from './credit-check/credit-check.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StorageComponent } from './storage/storage.component';
import { SageInvoicesComponent } from './sage-invoices/sage-invoices.component';


@NgModule({
    declarations: [
        AccountsComponent,
        FixedCostComponent,
        CreditCheckComponent,
        StorageComponent,
        SageInvoicesComponent
    ],
    imports: [
        CommonModule,
        AccountsRoutingModule,
        FormsModule,
        FeatherModule.pick(allIcons),
        SharedModule,
        BsDatepickerModule
    ]
})
export class AccountsModule { }
