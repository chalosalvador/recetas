import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { CommonService } from './services/common.service';
import { UserService } from './services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  profileInfo: any = {};
  constructor(
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
  ) {
    this.initializeApp();
    this.getProfile();
  }

  initializeApp() {

    //ENVIO DEL LINK PARA LOGUEARSE EN LA APLICACION
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();

      // Handle the logic here after opening the app with the Dynamic link
      this.firebaseDynamicLinks.onDynamicLink()
        .subscribe(async (res: any) => {
          console.log('DynamicLink', res);
          try {
            await this.authService.signInWithEmailLink(res.deepLink);
            console.log('LoggedIn');
            //redirige a la pagina de inicio
            // await this.navController.navigateRoot( [ 'home/tabs/tab1' ] );
          } catch (e) {
            await this.commonService.presentAlert('Login', '', 'Hubo un error al iniciar sesión.');
          }

        }, (error: any) => console.log('DynamicLink ERROR', error));

      //PROCESO DE LOGIN IDENTIFICA SI YA ESTA O NO LOGUEADO EL USUARIO
      this.authService.authState()
        .subscribe(async (user: any) => {
          if (user) {
            console.log('LoggedIn', user);
            // hacer consulta a la base para traer datos del usuario que esta ingresando
            this.userService.getUser(user.uid).subscribe(async userData => {
              if (!userData.exists) { // nos dice si ya lleno o no el formualrio de datos
                await this.navController.navigateRoot(['start']); // va al form de datos
              } else {
                await this.navController.navigateRoot(['tabs/tab1']); // va al inicio de app
              }
            });
            //
            this.splashScreen.hide();
          } else {
            console.log('NO LoggedIn');
            await this.navController.navigateRoot(['login']);

            this.splashScreen.hide();
          }
        });

    });
  }

  getProfile() {
    //OBTENER EL USUARIO LOGUEADO
    this.authService.authState()
      .subscribe(user => {
        if (user) {
          this.profileInfo = user.toJSON();
        }
      });
  }

  passData() {
    this.router.navigateByUrl('/profile');

  }
  //BOTON CERRAR CESION
  async doLogout() {
    try {
      await this.authService.logout();
      await this.commonService.presentAlert('Cerrar Sesion', 'Usted a cerrado Sesion.');
    } catch (e) {
      console.error(e);

    }

  }
}
