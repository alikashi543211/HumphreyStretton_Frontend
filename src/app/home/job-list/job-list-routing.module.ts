import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditWorkOrderComponent } from './edit-work-order/edit-work-order.component';
import { JobListComponent } from './job-list/job-list.component';

const jobListRoutes: Routes = [
  {
      path: '',
      component: JobListComponent
  },
  {
      path: 'update/:id',
      component: EditWorkOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(jobListRoutes)],
  exports: [RouterModule]
})
export class JobListRoutingModule { }
