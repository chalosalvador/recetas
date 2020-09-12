import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage {

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
  
  constructor(private authService: AuthService, public commonService: CommonService) {}
  
  

}
