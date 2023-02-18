import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { allIcons } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
defineLocale('en-gb', enGbLocale);

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FeatherModule.pick(allIcons),
        BsDatepickerModule
    ]
})
export class DashboardModule {

    constructor(private bsLocale: BsLocaleService) {
        this.bsLocale.use('en-gb');
    }
}
