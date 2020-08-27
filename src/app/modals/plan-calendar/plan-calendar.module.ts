import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlanCalendarPageRoutingModule } from './plan-calendar-routing.module';
import { PlanCalendarPage } from './plan-calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanCalendarPageRoutingModule,
    NgCalendarModule

  ],
  declarations: [PlanCalendarPage]
})
export class PlanCalendarPageModule {}
