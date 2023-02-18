import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const ForgotPasswordroutes: Routes = [
    {
        path: '',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset',
        component: ResetPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(ForgotPasswordroutes)],
    exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
