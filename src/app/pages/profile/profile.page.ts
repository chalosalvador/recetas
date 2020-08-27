import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import {EditUserPage} from 'src/app/modals/edit-user/edit-user.page';
import { RecipesService } from '../../services/recipes.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CommonService } from '../../services/common.service';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';


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
        if(!this.details.image){
          this.details.image="https://image.flaticon.com/icons/png/512/149/149071.png";
  
        }
       
  
  
      });


  
   
  }
  
   ngOnInit() {
 
  // this.details.image="https://image.flaticon.com/icons/png/512/149/149071.png";
  
  
  }
  async openModalEditUser() {

    const modal = await this.modalController.create({
      component: EditUserPage,
      cssClass:'modal-editUser',
      backdropDismiss:false,
      componentProps: { detailUser: this.details }
    });
    await modal.present();
  
  }

 
  // getImages() {
  //   this.options = {
  //     // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
  //     // selection of a single image, the plugin will return it.
  //     maximumImagesCount: 1,

  //     // max width and height to allow the images to be.  Will keep aspect
  //     // ratio no matter what.  So if both are 800, the returned image
  //     // will be at most 800 pixels wide and 800 pixels tall.  If the width is
  //     // 800 and height 0 the image will be 800 pixels wide if the source
  //     // is at least that wide.
  //     width: 200,
  //     //height: 200,

  //     // quality of resized image, defaults to 100
  //     quality: 25,

  //     // output type, defaults to FILE_URIs.
  //     // available options are 
  //     // window.imagePicker.OutputType.FILE_URI (0) or 
  //     // window.imagePicker.OutputType.BASE64_STRING (1)
  //     outputType: 1
  //   };
    
  //   this.imagePicker.getPictures(this.options).then((results) => {
  //       this.imageResponse='data:image/jpeg;base64,' + results;
  //   }, (err) => {
  //     alert(err);
  //   });
  //   let userImage = {
  //     image:this.imageResponse
  //   }
  //   this.userService.updateUser(userImage)
  //   .then(() => {
  //     console.log('actualizado');
  //     }
  //   ).catch((error)=>{
  //     console.log('error', error);
      
  //   })

    
  // }
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
