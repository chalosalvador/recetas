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





  constructor(private authService: AuthService, public commonService: CommonService) {}
  
  async doLogout() {
    try {
      await this.authService.logout();
    } catch ( e ) {
      console.error( e );
      await this.commonService.presentAlert( 'Error', 'No se pudo enviar el correo electrónico de inicio de sesión.' );
    }
  }

}
