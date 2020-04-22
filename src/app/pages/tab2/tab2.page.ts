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
        'id':'0000',
        'name':'DESAYUNO',
        'imagen':'/assets/ImagenListas/desayuno.png'
      },
      {
        'id':'1111',
        'name':'ALMUERZO',
        'imagen':'/assets/ImagenListas/almuerzo.png'
      },
      {
        'id':'2222',
        'name':'MERIENDA',
        'imagen':'/assets/ImagenListas/cena.png'
      }
    ]
  }

}
