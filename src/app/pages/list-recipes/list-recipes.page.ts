import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.page.html',
  styleUrls: ['./list-recipes.page.scss'],
})
export class ListRecipesPage implements OnInit {

  recipesList: Array<any> = [];
  recipeDetails: any;

  constructor(
    public recipesService: RecipesService,
    public router: Router,
    public afDB: AngularFirestore,
    public afSG: AngularFireStorage,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getListRecipes();//inicializa la lista de recetas


  }
  //obtiene los datos desde la coleccion recetas y los muestra en una lista de platos
  //segun el tipo de comida seleccionado 
  //La lista esta generada en un array en tab2
  getListRecipes() {

    let type = this.route.snapshot.paramMap.get('type');
    console.log(type);

    this.recipesService.getListRecipes(type).subscribe(data => {
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



}
