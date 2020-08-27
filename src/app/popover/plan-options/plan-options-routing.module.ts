import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanOptionsPage } from './plan-options.page';

const routes: Routes = [
  {
    path: '',
    component: PlanOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanOptionsPageRoutingModule {}
