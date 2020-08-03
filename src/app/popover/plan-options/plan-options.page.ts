import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController, ModalController} from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-options',
  templateUrl: './plan-options.page.html',
  styleUrls: ['./plan-options.page.scss'],
})
export class PlanOptionsPage implements OnInit {
  optionsPlan: any;

  constructor(public userService: UserService, 
    public navCtrl: NavController,
    public navParams: NavParams, 
    public commonService: CommonService,
    public popoverCtrl: PopoverController,
    public viewCtrl: ModalController,
    private router: Router) {
      this.optionsPlan = navParams.get('detailsRecipe');
    console.log(this.optionsPlan);
     }

  ngOnInit() {
  }
  deletePLan(){
    this.commonService.presentAlertConfirm(
      'Planifición',
      '¿Esta seguro de eliminar la receta de su planificación?' ,
      [
        {
          text:'Cancel',
          role:'cancel',
          handler:(blah)=>{
             this.popoverCtrl.dismiss();
          }
        }, {
          text:'Ok',
          handler:async()=>{
            try{ 
            this.userService.deletePlan(this.optionsPlan.id);
            this.commonService.presentLoading();
            this.popoverCtrl.dismiss();
            this.viewCtrl.dismiss();
                console.log('plan eliminado ');
            }catch(error){
               this.commonService.presentAlert(error.message)
            }
          }
        }
      ]
    )

  }
  
replacePlan(){
  this.router.navigateByUrl('tabs/tab2');
  this.commonService.presentLoading();
  this.popoverCtrl.dismiss();
  this.viewCtrl.dismiss();
}

}
