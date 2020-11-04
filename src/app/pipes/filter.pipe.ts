import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any , text:any): any {
    if(text.length===0 || text===''){return value;}
    const resultRecipes=[];
    for (const recipes of value){
      if(recipes.name.toLocaleLowerCase().indexOf(text.toLocaleLowerCase())>-1){
        resultRecipes.push(recipes);
      };
    };
    return resultRecipes;
   
  }

}
