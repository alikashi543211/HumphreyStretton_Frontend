import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
    declarations: [ForgotPasswordComponent, ResetPasswordComponent],
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        FormsModule
    ]
})
export class ForgotPasswordModule { }
