import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
    declarations: [
        UsersComponent,
        RolesComponent,
        SettingsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        AdministrationRoutingModule,
        SharedModule,
        FeatherModule.pick(allIcons)
    ]
})
export class AdministrationModule { }
