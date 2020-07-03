import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: [ 'tab2.page.scss']
})
export class Tab2Page {
  //LISTA DE TIPOS DE COMIDAS 
  list=[];
  constructor() {
    this.list=[
      {
        'category':'Desayuno',
        'title': 'DESAYUNO',
        'imagen':'/assets/ImagenListas/desayuno.png'
      },
      {
        'category':'Almuerzo',
        'title': 'ALMUERZO',
        'imagen':'/assets/ImagenListas/almuerzo.png'
      },
      {
        'category':'Merienda',
        'title': 'MERIENDA',
        'imagen':'/assets/ImagenListas/cena.png'
      }
    ]
  }

}
