import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  detailUser: any;
  validations_form: FormGroup;
  imageResponse: any;
  options: any;
  constructor(public viewCtrl: ModalController, public userService: UserService, public navCtrl: NavController,
    navParams: NavParams, public commonService: CommonService,private formBuilder: FormBuilder,private imagePicker: ImagePicker,) {
    this.detailUser = navParams.get('detailUser');
    console.log(this.detailUser);
    this.imageResponse=this.detailUser.image
    
   }

  ngOnInit() {
    this.limpiarCampos();

  }
  limpiarCampos() {

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25),Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      dateBirth: new FormControl('', Validators.required),
      height: new FormControl('',[Validators.required,Validators.max(220), Validators.min(90)]),
      weight: new FormControl('', [Validators.required,Validators.max(200), Validators.min(30)]),
      gender: new FormControl('', Validators.required),
      activities: new FormControl('', Validators.required),
     
      
    


    });
  }
  closeModal(){
    this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
   getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 1,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    
    this.imagePicker.getPictures(this.options).then((results) => {
        this.imageResponse='data:image/jpeg;base64,' + results;
    }, (err) => {
      alert(err);
    });
    
  }
  updateUserDetail(value){
    let dataUser = {//declaracion de los datos que se obtiene de los inputs
      name: value.name,
      lastname: value.lastname,
      nickname: value.nickname,
      dateBirth: value.dateBirth,
      height: value.height,
      weight: value.weight,
      gender: value.gender,
      dailyActivities:value. activities,
      image:this.imageResponse
    }
    this.commonService.presentLoading();
    this.userService.updateUser(dataUser)//llama a la funcion crear usuario desde user.service.ts
      .then(() => {
        console.log('actualizado');
        
          this.viewCtrl.dismiss();//Cerrar el modal de datos del usuario
          this.navCtrl.pop();
        }
      ).catch((error)=>{
        console.log('error', error);
        
      })
  }

}
