import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';

const historyRoutes: Routes = [
    {
        path: '',
        component: HistoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(historyRoutes)],
    exports: [RouterModule]
})
export class HistoryRoutingModule { }
