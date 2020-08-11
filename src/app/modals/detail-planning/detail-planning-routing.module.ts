import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPlanningPage } from './detail-planning.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPlanningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPlanningPageRoutingModule {}
