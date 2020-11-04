import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { RecipesService } from '../../services/recipes.service';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss']
})
export class Tab1Page implements OnInit {
  recipesListDate: Array<any> = [];
  subscription: any;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(private platform:Platform,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    public router: Router, 
    public commonService: CommonService, 
    private userService: UserService,
    public recipesService: RecipesService) {
     }
    
    async doLogout() {
      try {
        await this.authService.logout();
      } catch ( e ) {
        console.error( e );
        await this.commonService.presentAlert( 'Error', 'No se pudo enviar el correo electrónico de inicio de sesión.' );
      }
    }
  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(){
    this.recipesService.getRecipesDate().subscribe(data => {
      this.recipesListDate = data
      console.log(data);

    });
      
  }
   //FUNCION PARA PASAR LOS DATOS DE LA RECETA SELECCIONADA A LA PAGINA 
  //DE DETALLES DE LA RECETA 
  pass(recipe) {
    this.recipesService.sendData(recipe)
    console.log(recipe);

    this.router.navigateByUrl('/recipes');

  }
  search(){
    this.router.navigateByUrl('tabs/tab2')
  }
  

}
