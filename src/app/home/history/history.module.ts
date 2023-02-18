import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


@NgModule({
    declarations: [
        HistoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        HistoryRoutingModule,
        FeatherModule.pick(allIcons),
        BsDatepickerModule
    ]
})
export class HistoryModule { }
