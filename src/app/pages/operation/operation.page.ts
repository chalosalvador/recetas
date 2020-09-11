import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
export class OperationPage implements OnInit {
  slides = [
    {
      img: 'assets/recetasSanas.PNG',
      titulo: 'Explora recetas sanas y deliciosas  '

    },
    {
      img: 'assets/menuComidas.PNG',
      titulo: 'Planifica tus comidas con un menu validado por nutricionistas '
    },
    {
      img: 'assets/nutricion.PNG',
      titulo: 'Recibe un análisis nutricional de tu consumo semanal '
    }
  ];




  constructor() { }

  ngOnInit() {
  }
  

}
