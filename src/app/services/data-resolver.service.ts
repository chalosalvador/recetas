import { RecipesService } from './recipes.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {
  recipeDetails:any;
  constructor(private recipesService : RecipesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    console.log(id)
    // return this.recipesService.getRecipes(id).subscribe(data=>{
    // this.recipeDetails=data
    // console.log(this.recipeDetails)
    // })
      
  
    
  }
}