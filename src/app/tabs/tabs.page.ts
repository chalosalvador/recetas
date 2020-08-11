import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service'
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: [ 'tabs.page.scss']
})
export class TabsPage {
  userId: string;
  userDetails:any={};
  userDetailList: Array<any> = [];
  constructor(private route: ActivatedRoute,private authService: AuthService, public commonService: CommonService, public userService:UserService) {
    //OBTENER LA IP DE LA RECETA SELECCIONADA
    this.route.params.subscribe(result=>{
      console.log('result==',result);
      this.userId=result.id;
      this.getDataUser();
    });
  }
  
  async doLogout() {
    try {
      await this.authService.logout();
    } catch ( e ) {
      console.error( e );
      await this.commonService.presentAlert( 'Error', 'No se pudo enviar el correo electrónico de inicio de sesión.' );
    }

}
async getDataUser() {
  try {
    const result=await this.userService.getUser(this.userId);
    console.log('user',result);
    this.userDetails=result;
    this.userDetailList = [];
    for (const key in this.userDetails) {
      this.userDetailList.push({
        name: key,
        value: this.userDetails[key]
      });
    }
  } catch (error) {
    console.log(error);
    
  }
}
}