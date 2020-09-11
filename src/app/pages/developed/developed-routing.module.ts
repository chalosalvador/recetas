import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevelopedPage } from './developed.page';

const routes: Routes = [
  {
    path: '',
    component: DevelopedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevelopedPageRoutingModule {}
