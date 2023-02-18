import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { DeliveryListRoutingModule } from './delivery-list-routing.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { WalkingComponent } from './walking/walking.component';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { StorageComponent } from './storage/storage.component';
import { defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { LoadAnalyticsComponent } from './load-analytics/load-analytics.component';
import { ColorPickerModule } from 'ngx-color-picker';
defineLocale('en-gb', enGbLocale);
@NgModule({
    declarations: [
        DeliveryComponent,
        WalkingComponent,
        StorageComponent,
        LoadAnalyticsComponent
    ],
    imports: [
        CommonModule,
        DeliveryListRoutingModule,
        FormsModule,
        FeatherModule.pick(allIcons),
        SharedModule,
        NgbModule,
        BsDatepickerModule.forRoot(),
        DragDropModule,
        ColorPickerModule
    ]
})
export class DeliveryListModule {

    constructor(private bsLocale: BsLocaleService) {
        this.bsLocale.use('en-gb');
    }
}
