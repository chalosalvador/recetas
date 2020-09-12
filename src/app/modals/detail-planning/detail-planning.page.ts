import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { CommonService } from 'src/app/services/common.service';
import { PlanOptionsPage } from 'src/app/popover/plan-options/plan-options.page';


@Component({
  selector: 'app-detail-planning',
  templateUrl: './detail-planning.page.html',
  styleUrls: ['./detail-planning.page.scss'],
})
export class DetailPlanningPage implements OnInit {
  detailEvents: any;
  constructor(
    public viewCtrl: ModalController, 
    public userService: UserService, 
    public navCtrl: NavController,
    public navParams: NavParams, 
    public commonService: CommonService,
    public popoverCtrl: PopoverController) 
    {
    this.detailEvents = navParams.get('eventsDetail');
    console.log(this.detailEvents);
   }

  ngOnInit() {
  }
  async openPopover(ev:any) {
    const popover = await this.popoverCtrl.create({
      component: PlanOptionsPage,
      cssClass: 'popover-plan',
      event: ev,
      componentProps: { detailsRecipe: this.detailEvents },
      translucent: false
    });
    return await popover.present();
  }
  
  closeModal(){
    this.viewCtrl.dismiss()
  }

}
