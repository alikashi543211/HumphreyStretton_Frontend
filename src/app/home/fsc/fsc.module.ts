import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FscRoutingModule } from './fsc-routing.module';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HistoryComponent } from './history/history.component';


@NgModule({
    declarations: [
        CustomerOrderComponent,
        PurchaseOrderComponent,
        HistoryComponent
    ],
    imports: [
        CommonModule,
        FscRoutingModule,
        NgbModalModule,
        FormsModule,
        SharedModule,
        FeatherModule.pick(allIcons),
        BsDatepickerModule
    ]
})
export class FscModule { }
