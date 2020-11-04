import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: [ 'tab2.page.scss']
})
export class Tab2Page implements OnInit {
  //LISTA DE TIPOS DE COMIDAS 
  recipesList: Array<any> = [];
  recipeDetails: any;
  items:any;
  filterRecipes='';
  constructor(
    public recipesService: RecipesService,
    public router: Router,
    public afDB: AngularFirestore,
    public afSG: AngularFireStorage,
    private route: ActivatedRoute
  ) {
  }
   

  ngOnInit() {
    this.getListRecipes();//inicializa la lista de recetas
   
  }
  //obtiene los datos desde la coleccion recetas y los muestra en una lista de platos
  //segun el tipo de comida seleccionado 
  //La lista esta generada en un array en tab2
  getListRecipes() {

    this.recipesService.getRecipesList().subscribe(data => {
      this.recipesList = data
      console.log(this.recipesList);
     

    });

  }
  //FUNCION PARA PASAR LOS DATOS DE LA RECETA SELECCIONADA A LA PAGINA 
  //DE DETALLES DE LA RECETA 
  pass(recipe) {
    this.recipesService.sendData(recipe)
    console.log(recipe);

    this.router.navigateByUrl('/recipes');

  }
//FILTRO DE BUSQUEDA
  searchRecipes(event){
  const searchRecipe =event.target.value;
    this.filterRecipes=searchRecipe;
    console.log(searchRecipe);


  }

}
