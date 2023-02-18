import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const settingRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(settingRoutes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
