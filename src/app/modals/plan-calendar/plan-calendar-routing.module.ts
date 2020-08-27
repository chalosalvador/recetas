import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanCalendarPage } from './plan-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: PlanCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanCalendarPageRoutingModule {}
