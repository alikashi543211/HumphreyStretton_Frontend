import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupAccountRoutingModule } from './setup-account-routing.module';
import { SetupAccountComponent } from './setup-account.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SetupAccountComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SetupAccountRoutingModule
    ]
})
export class SetupAccountModule { }
