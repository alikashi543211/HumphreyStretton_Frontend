import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { JobListRoutingModule } from './job-list-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgxPrintModule } from 'ngx-print';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EditWorkOrderComponent } from './edit-work-order/edit-work-order.component';


@NgModule({
  declarations: [
    JobListComponent,
    EditWorkOrderComponent
  ],
  imports: [
    CommonModule,
    JobListRoutingModule,
    FormsModule,
    NgbModalModule,
    NgbModule,
    FeatherModule.pick(allIcons),
    SharedModule,
    NgxPrintModule,
    BsDatepickerModule
  ]
})
export class JobListModule { }
