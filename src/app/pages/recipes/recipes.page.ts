import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  recipeId:string;
  recipeDetails:any={};
  recipeDetailList: Array<any> = [];
  constructor(
    private route: ActivatedRoute, 
    public recipesService : RecipesService
    //private widgeUtilServices:WidgeUtilService
    ){ 
    //OBTENER LA IP DE LA RECETA SELECCIONADA
    this.route.params.subscribe(result=>{
      console.log('result==',result);
      this.recipeId=result.id;
      this.getDataRecipes();
    });
    }

  ngOnInit() {

  }
  //funcion para imprimir la informacion de las recetas seleccionadas
  async getDataRecipes() {
    try {
      const result=await this.recipesService.getRecipes('recipes',this.recipeId);
      console.log('recipes',result);
      this.recipeDetails=result;
      this.recipeDetailList = [];
      for (const key in this.recipeDetails) {
        this.recipeDetailList.push({
          name: key,
          value: this.recipeDetails[key]
        });
      }
    } catch (error) {
      console.log(error);
      
    }
  }
    
  

}
