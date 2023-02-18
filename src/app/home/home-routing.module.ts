import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from '../shared/guards/permissions.guard';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [PermissionsGuard]
    },
    {
        path: 'administration',
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
        canActivate: [PermissionsGuard]
    },
    {
        path: 'rod',
        loadChildren: () => import('./rod/rod.module').then(m => m.RodModule),
        canActivate: [PermissionsGuard]
    },
    {
        path: 'delivery-list',
        loadChildren: () => import('./delivery-list/delivery-list.module').then(m => m.DeliveryListModule),
        canActivate: [PermissionsGuard]
    },
    {
        path: 'fsc',
        loadChildren: () => import('./fsc/fsc.module').then(m => m.FscModule),
        canActivate: [PermissionsGuard]
    },
    {
        path: 'history',
        loadChildren: () => import('./history/history.module').then(m => m.HistoryModule),
        canActivate: [PermissionsGuard]
    },
    {
        path: 'phonebook',
        loadChildren: () => import('./phonebook/phonebook.module').then(m => m.PhonebookModule),
        canActivate: [PermissionsGuard]
    },
    {
        path: 'accounts',
        loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
        canActivate: [PermissionsGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: 'job-list',
        loadChildren: () => import('./job-list/job-list.module').then(m => m.JobListModule),
        canActivate: [PermissionsGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
