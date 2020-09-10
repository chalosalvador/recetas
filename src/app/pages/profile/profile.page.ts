import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import {EditUserPage} from 'src/app/modals/edit-user/edit-user.page';
import { RecipesService } from '../../services/recipes.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CommonService } from '../../services/common.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  details: any = {};
  id: any;
  imageResponse: any;
  options: any;
  constructor(
    public recipesService: RecipesService,
    private route: ActivatedRoute, 
    private router: Router,
    private imagePicker: ImagePicker,
    public userService: UserService,
    public modalController: ModalController, 
    public commonService: CommonService) {

      this.userService.getUserDetail().subscribe(data => {
        this.details=data;
        console.log(this.details);
      });
   
  }
  
   ngOnInit() {
    this.commonService.presentLoading();
  }
  async openModalEditUser() {
    this.commonService.presentLoading();
    const modal = await this.modalController.create({
      component: EditUserPage,
      cssClass:'modal-editUser',
      backdropDismiss:false,
      componentProps: { detailUser: this.details }
    });
    await modal.present();
  
  }

 
  getImages(){
 
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            
              this.imageResponse='data:image/jpeg;base64,' + results
            
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }
}
