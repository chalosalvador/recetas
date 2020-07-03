import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { ModalController } from '@ionic/angular';
import { PlanCalendarPage } from 'src/app/modals/plan-calendar/plan-calendar.page';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  detail: any = {};
  chefs: any = {};
  detailIngredients: any = {};
  detailUnits: any = {};
  recipeIngredients: any = [];
  finalIngredients: any = [];

  constructor(

    public recipesService: RecipesService,
    public modalController: ModalController) {

  }

  async ngOnInit() {
    //OBTENER LOS DATOS DESDE LA PAGINA LIST RECIPES       
    this.detail = this.recipesService.getData();
    //OBTENER DATOS DEL CHEF DESDE LA BASE
    let chefData = await this.detail.chef.get();
    //VERIFICA SI EL USER EXISTE O NO
    console.log('chefData.exists', chefData.exists);
    this.detail.chefData = chefData.data();//agregar a la lista obtenida de la base de datos
    this.chefs = this.detail.chefData//lista para mostrar en html
    console.log(this.chefs);

    //CONSULTA A COLECCION UNIDADES Y ARMAR UN OBJETO
    this.recipesService.getUnits().subscribe(unitSnap => {

      unitSnap.forEach(unitObject => {
        var id_unit = unitObject.payload.doc.id;
        var unit: any = unitObject.payload.doc.data();

        this.detailUnits[id_unit] = unit.name;//realiza el cambio de arreglo a atributo unit=name

      })
      //console.log(this.detailUnits);

    });
    //CONSULTA A COLECCION INGREDIENTS Y ARMAR UN OBJETO
    this.recipesService.getIngredients().subscribe(IngredientSnap => {

      IngredientSnap.forEach(IngredientObject => {
        var id_ingredient = IngredientObject.payload.doc.id;
        var ingredient: any = IngredientObject.payload.doc.data();

        this.detailIngredients[id_ingredient] = ingredient.name;//realiza el cambio de arreglo a atributo unit=name

      })
      //console.log(this.detailIngredients);

      //OBTENER LA LISTA DE INGREDIENTES DE LA RECETA
      for (let ingredientData of this.detail.ingredients) {
        this.recipeIngredients = {
          ...ingredientData,
          ingredient: this.detailIngredients[ingredientData.ingredient.id],
          unit: this.detailUnits[ingredientData.unit.id],//referencia al objeto de unidades
          quantity: ingredientData.quantity

        }
        this.finalIngredients.push(this.recipeIngredients);//hacer arreglo de los ingredientes
      }
      console.log(this.finalIngredients);
    });




  }
  //ABRIR EL LA PAGINA MODAL
  // async openModal(){
  //   const modal = await this.modalController.create({
  //     component: PlanCalendarPage
  //   });
  //   return await modal.present();
  // }
  //PASAR DATOS AL MODAL
  async openModal(detailRecipe) {

    const modal = await this.modalController.create({
      component: PlanCalendarPage,
      componentProps: { detailRecipe: detailRecipe }
    });
    return await modal.present();
  }

}