import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { ToastController, Platform, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loading: any = {};
  constructor(
    private toastController: ToastController,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private platform: Platform, ) {
  }
  //funcion que muestra un mensaje en la parte inferior de la ventana
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      //showCloseButton: true,
      position: this.platform.is('desktop') ? 'top' : 'bottom'
    });
    toast.present();
  }
  //FUNCION PARA MOSTRAR QUE ESTA CARGANDO EL LOGIN
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000,
      translucent: true,
    });
    return await this.loading.present();
  }

  async dismissLoader() {
    await this.loading.dismiss();
  }

  //FUNCION PARA MOSTRAR UN MENSAJE DE ALERTA 
  async presentAlert(title = '', subtitle = '', message = '') {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subtitle,
      message,
      buttons: ['OK']
    });

    await alert.present();

    return alert;
  }

  async presentAlertConfirm(header, message, buttons) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons
    });

    await alert.present();
  }

}
