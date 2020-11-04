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
    navParams: NavParams, public commonService: CommonService, private formBuilder: FormBuilder, private imagePicker: ImagePicker,) {
    this.detailUser = navParams.get('detailUser');
    console.log(this.detailUser);
    this.imageResponse = this.detailUser.image

  }

  ngOnInit() {
    this.limpiarCampos();

  }
  limpiarCampos() {

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      dateBirth: new FormControl('', Validators.required),
      height: new FormControl('', [Validators.required, Validators.max(220), Validators.min(90)]),
      weight: new FormControl('', [Validators.required, Validators.max(200), Validators.min(30)]),
      gender: new FormControl('', Validators.required),
      activities: new FormControl('', Validators.required),





    });
  }
  validation_messages = {
    'name': [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'El nombre debe tener al menos 3 caracteres.' },
      { type: 'maxlength', message: 'El nombre no puede ser mayor a 15 caracteres.' },
      { type: 'pattern', message: 'Su nombre debe contener solo letras.' },
    ],
    'lastname': [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'El apellido debe tener al menos 4 caracteres.' },
      { type: 'maxlength', message: 'El apellido no puede ser mayor a 25 caracteres.' },
      { type: 'pattern', message: 'Su apellido debe contener solo letras.' },
    ],
    'nickname': [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'minlength', message: 'El apodo debe tener al menos 3 caracteres.' },
      { type: 'maxlength', message: 'El apodo no puede ser mayor a 20 caracteres.' },
      { type: 'pattern', message: 'Su apodo debe contener solo letras.' },
    ],
    'dateBirth': [
      { type: 'required', message: 'Campo requerido.' }
    ],
    'height': [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'min', message: 'El valor mínimo de la altura no puede ser menor a 90.' },
      { type: 'max', message: 'El valor máximo de la altura no puede ser mayor a 220.' },
      { type: 'pattern', message: 'Su altura debe contener solo números enteros.' },
    ],
    'weight': [
      { type: 'required', message: 'Campo requerido.' },
      { type: 'min', message: 'El valor mínimo del peso no puede ser menor a 30.' },
      { type: 'max', message: 'El valor máximo del peso no puede ser mayor a 200.' },
      { type: 'pattern', message: 'Su peso debe contener solo números enteros.' },
    ],
    'gender': [
      { type: 'required', message: 'Campo requerido.' }
    ],
    'dailyActivities': [
      { type: 'required', message: 'Campo requerido.' }
    ],
  
  


  }
  closeModal() {
    this.viewCtrl.dismiss();
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
      this.imageResponse = 'data:image/jpeg;base64,' + results;
    }, (err) => {
      alert(err);
    });

  }
  updateUserDetail(value) {
    let dataUser = {//declaracion de los datos que se obtiene de los inputs
      name: value.name,
      lastname: value.lastname,
      nickname: value.nickname,
      dateBirth: value.dateBirth,
      height: value.height,
      weight: value.weight,
      gender: value.gender,
      dailyActivities: value.activities,
      image: this.imageResponse
    }
    this.commonService.presentLoading();
    this.userService.updateUser(dataUser)//llama a la funcion crear usuario desde user.service.ts
      .then(() => {
        console.log('actualizado');
        this.commonService.presentAlert('Perfil', 'Tus datos han sido actualizados con éxito');
        this.viewCtrl.dismiss();//Cerrar el modal de datos del usuario
      }
      ).catch((error) => {
        this.commonService.presentAlert('Perfil', 'No fue posible actualizar sus Datos');
        console.log('error', error);

      })
  }

}
