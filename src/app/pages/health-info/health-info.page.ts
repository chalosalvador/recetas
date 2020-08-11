import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.page.html',
  styleUrls: ['./health-info.page.scss'],
})
export class HealthInfoPage implements OnInit {
  nom: string;
  isSave: boolean = false;
  //lista de problemas que seran mostrados en el html 
  problems = [
    { name: "Anemia", isChecked: false },
    { name: "Colesterol", isChecked: false },
    { name: "Problemas Cardiacos", isChecked: false },
    { name: "Presion Alta", isChecked: false },
    { name: "Diabetes", isChecked: false },
  ];


  constructor(
    public userService: UserService,
    public router: Router,
    private commonService: CommonService,
  ) {

  }

  ngOnInit() {

  }
  
  //FUNCION PARA TOMAR EL VALOR DEL CHECK DE CADA PROBLEMA
  onClick(problem) {
    console.log(problem);
    if (problem.isChecked) {//compara si el nombre del problema fue seleccionado o no 
      this.nom = problem.name;//asigna a la variable nom el problema tomado de la lista 
      console.log(this.nom);
    }
  }

  //FUNCION PARA GUARDAR LOS DATOS EN FIREBASE 
  save(value) {
    this.isSave = true;
    console.log(this.problems);
    const userProblems = [];//Declaracion de arreglo para almacenar los problemas
    this.problems.filter(problem => problem.isChecked == true);
    this.problems.forEach((problem) => {
      if (problem.isChecked) {
        userProblems.push(problem.name);
        console.log(userProblems)
      }

    })
    this.userService.addData(userProblems)//añade los datos a la coleccion users de cada usuario
      .then(() => {
        this.isSave = false;
          this.router.navigate(['/tabs/tab1']);//Navegacion a la pagina principal
        }
      ).catch((error)=>{
        console.log('error', error);
        this.isSave = false;
      })

  }

}
