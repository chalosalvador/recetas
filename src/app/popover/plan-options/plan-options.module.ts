import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanOptionsPageRoutingModule } from './plan-options-routing.module';

import { PlanOptionsPage } from './plan-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanOptionsPageRoutingModule
  ],
  declarations: [PlanOptionsPage]
})
export class PlanOptionsPageModule {}
