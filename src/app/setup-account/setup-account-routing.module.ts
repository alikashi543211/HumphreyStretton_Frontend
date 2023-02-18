import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupAccountComponent } from './setup-account.component';

const setupAccountRoutes: Routes = [
    {
        path: '',
        component: SetupAccountComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(setupAccountRoutes)],
    exports: [RouterModule]
})
export class SetupAccountRoutingModule { }
