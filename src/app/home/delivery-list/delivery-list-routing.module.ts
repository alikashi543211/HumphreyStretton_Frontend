import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { LoadAnalyticsComponent } from './load-analytics/load-analytics.component';
import { StorageComponent } from './storage/storage.component';
import { WalkingComponent } from './walking/walking.component';

const deliveryRoutes: Routes = [
    {
        path: '',
        redirectTo: 'delivery'
    },
    {
        path: 'delivery',
        component: DeliveryComponent
    },
    {
        path: 'walking',
        component: WalkingComponent
    },
    {
        path: 'storage',
        component: StorageComponent
    },
    {
        path: 'load-analytics',
        component: LoadAnalyticsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(deliveryRoutes)],
    exports: [RouterModule]
})
export class DeliveryListRoutingModule { }
