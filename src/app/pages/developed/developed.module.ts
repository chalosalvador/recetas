import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevelopedPageRoutingModule } from './developed-routing.module';

import { DevelopedPage } from './developed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevelopedPageRoutingModule
  ],
  declarations: [DevelopedPage]
})
export class DevelopedPageModule {}
