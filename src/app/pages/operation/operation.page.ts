import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
export class OperationPage implements OnInit {
  slides = [
    {
      img: 'assets/fondoInicio.jpg',
      titulo: 'Explora recetas sanas y deliciosas  '
    },
    {
      img: 'assets/ImagenFondo3.gif',
      titulo: 'Experimenta los beneficios de la comida vegana '
    },
    {
      img: 'assets/ImagenFondo.jpg',
      titulo: 'Planifica tus comidas con un menu validado por nutricionistas '
    }
  ];




  constructor() { }

  ngOnInit() {
  }
  

}
