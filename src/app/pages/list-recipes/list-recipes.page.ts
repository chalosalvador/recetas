import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';



@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.page.html',
  styleUrls: ['./list-recipes.page.scss'],
})
export class ListRecipesPage implements OnInit {

  recipesList: Array<any>=[];

  constructor(
    public recipesService : RecipesService, 
    public router: Router,
    public afDB: AngularFirestore, 
    public afSG:AngularFireStorage,
  ) { }

  ngOnInit() {
    this.getListRecipes();//inicializa la lista de recetas
  }
  //obtiene los datos desde la coleccion recetas y los muestra en una lista de platos
  //segun el tipo de comida seleccionado 
  //La lista esta generada en un array en tab2
  getListRecipes(){
    this.recipesService.getRecipesList().subscribe(result=>{
      console.log('result',result);
      this.recipesList=result;
    }, (error)=>{
      console.log(error)
    })
  }

}
