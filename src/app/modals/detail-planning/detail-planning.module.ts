import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPlanningPageRoutingModule } from './detail-planning-routing.module';

import { DetailPlanningPage } from './detail-planning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPlanningPageRoutingModule
  ],
  declarations: [DetailPlanningPage]
})
export class DetailPlanningPageModule {}
