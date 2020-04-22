import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { InformationPage} from '../information/information.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss']
})
export class Tab1Page {

  constructor(public afAuth: AngularFireAuth,private authService: AuthService, public commonService: CommonService, private userService: UserService,) {}

  
  async doLogout() {
    try {
      await this.authService.logout();
    } catch ( e ) {
      console.error( e );
      await this.commonService.presentAlert( 'Error', 'No se pudo enviar el correo electrónico de inicio de sesión.' );
    }
  }

}
