import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWorkOrderComponent } from './add-work-order/add-work-order.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { RodComponent } from './rod.component';

const rodRoutes: Routes = [
    {
        path: '',
        component: RodComponent
    },
    {
        path: 'delivery-notes/:id',
        component: DeliveryNoteComponent
    },
    {
        path: 'add',
        component: AddWorkOrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(rodRoutes)],
    exports: [RouterModule]
})
export class RodRoutingModule { }
