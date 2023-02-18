import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';

const administrationRoutes: Routes = [
    {
        path: '',
        redirectTo: 'users'
    },
    {
        path: 'roles',
        component: RolesComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(administrationRoutes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
