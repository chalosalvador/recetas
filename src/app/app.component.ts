import { Component, QueryList, ViewChildren } from '@angular/core';
import { AlertController, IonRouterOutlet, NavController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { CommonService } from './services/common.service';
import { UserService } from './services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  profileInfo: any = {};
  detailsImage: any = {};
  isLoggedIn: boolean = false;
  
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    private authService: AuthService,
    private commonService: CommonService,
    private userService: UserService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private _location: Location,


  ) {

    this.initializeApp();
    this.getProfile();
  }

  initializeApp() {

    // ENVIO DEL LINK PARA LOGUEARSE EN LA APLICACION
    this.platform.ready().then(async () => {
      this.backButtonEvent();
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
      // Handle the logic here after opening the app with the Dynamic link
      this.firebaseDynamicLinks.onDynamicLink()
        .subscribe((res: any) => {
          console.log('DynamicLink', res);
          try {
            this.commonService.presentLoadingAuthentication();
            this.authService.signInWithEmailLink(res.deepLink);
            console.log('LoggedIn');

          } catch (e) {
            this.commonService.presentAlert('Login', 'Hubo un error al iniciar sesión.');
          }

        }, (error: any) => console.log('DynamicLink ERROR', error));

      // PROCESO DE LOGIN IDENTIFICA SI YA ESTA O NO LOGUEADO EL USUARIO
      this.authService.authState()
        .subscribe(async (user: any) => {
          if (user) {
            this.isLoggedIn = true;
            console.log('LoggedIn', user);
            // hacer consulta a la base para traer datos del usuario que esta ingresando
            this.userService.getUserDetail()
              .subscribe(async userData => {
                if (!userData) { // nos dice si ya lleno o no el formualrio de datos
                  this.navController.navigateRoot(['/start']); // redirige a la página de bienvenida y despues a registro de datos
                } else {
                  this.detailsImage = userData;
                  console.log('usuario logueado', userData);

                  this.navController.navigateRoot(['tabs/tab1']);// redirige a la página de inicio de app
                }
              });


            /**
             * START PUSH NOTIFICATIONS
             */

            FirebasePlugin.onTokenRefresh((fcmToken) => {
              console.log('getToken', JSON.stringify(fcmToken));
              if (fcmToken) {
                console.log('Device registered' + JSON.stringify(fcmToken));
                this.userService.registerToken(fcmToken, user.uid);
              }
            }, (error) => {
              console.error(error);
            });

            FirebasePlugin.onMessageReceived(async (message: any) => {
              console.log('Message type: ' + message.messageType);
              if (message.messageType === 'notification') {
                console.log('Notification message received');


                if (message.tap === 'background' && message.message) {
                  console.log('Tapped in ' + message.tap);

                  const alert = await this.alertCtrl.create({
                    header: message.title,
                    message: message.message,
                    buttons: ['Genial!']
                  });
                  alert.present();
                } else {
                  const toast = await this.toastCtrl.create({
                    message: message.message,
                    duration: 3000,
                    position: 'top'
                  });
                  toast.present();
                }
              }
              console.dir(message);
            }, (error) => {
              console.error(error);
            });

            this.splashScreen.hide();
          } else {
            this.isLoggedIn = false;
            console.log('NO LoggedIn');
            this.navController.navigateRoot(['login']);

            this.splashScreen.hide();
          }
        });


    });

    
  }
  backButtonEvent() {
    document.addEventListener("backbutton", () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === "/login" || this.router.url==="/tabs/tab1") {
          navigator['app'].exitApp(); // work for ionic 4
        } else if (outlet.canGoBack()) {
          navigator['app'].exitApp(); // work for ionic 4
        }
      });
    });
  }

  getProfile() {
    // OBTENER EL USUARIO LOGUEADO
    this.authService.authState()
      .subscribe(user => {
        if (user) {
          this.profileInfo = user.toJSON();
          console.log(this.profileInfo);

        }
      });
  }
  passData() {
    this.router.navigateByUrl('/profile');

  }
  // BOTON CERRAR CESION
  doLogout() {
    try {
      this.authService.logout();
      


    } catch (e) {
      console.error(e);

    }

  }

}
