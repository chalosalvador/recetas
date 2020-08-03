import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { InformationPage} from '../information/information.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { RecipesService } from '../../services/recipes.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss']
})
export class Tab1Page implements OnInit {
  recipesListDate: Array<any> = [];
  constructor(public afAuth: AngularFireAuth,
    private authService: AuthService,
    public router: Router, 
    public commonService: CommonService, 
    private userService: UserService,
    public recipesService: RecipesService) {

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
