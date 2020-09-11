import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlanCalendarPageRoutingModule } from './plan-calendar-routing.module';
import { PlanCalendarPage } from './plan-calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { registerLocaleData} from '@angular/common';
import localeEsEc from '@angular/common/locales/es-EC';
registerLocaleData(localeEsEc);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanCalendarPageRoutingModule,
    NgCalendarModule

  ],
  declarations: [PlanCalendarPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Ec' }
  ]
})
export class PlanCalendarPageModule {}
