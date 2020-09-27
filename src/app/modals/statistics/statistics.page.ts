import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { NavParams } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  @ViewChild("barCanvas", { static: true }) barCanvas;

  private barChart: Chart;

  events: any;
  detailsUser: any;
  calories: any = [];
  fat: any = [];
  protein: any = [];
  sumCalories: number = 0;
  sumFat: number = 0;
  sumProtein: number = 0;
  messageCalories: string;
  messageFat: string;
  messageProtein: string;
  caloriesRef: number = 0;
  fatRef: number = 0;
  proteinRef: number = 0;
  basalRate: number = 0;
  averageFat: number = 0;
  averageProtein: number = 0;
  dayCalories: number = 0;
  dayGramsFat: number = 0;
  dayGramsProtein: number = 0;
  refDayCalories:number=0;
  refDayFat:number=0;
  refDayProtein:number=0;

  constructor(public viewCtrl: ModalController, public userService: UserService,
    navParams: NavParams, public commonService: CommonService) {
    this.events = navParams.get('events');
    console.log('recetas estadisticas ', this.events);
  }
  ngOnInit() {
   
    //CONSULTA A TODOS LOS DATOS DEL USUARIO CON LA SESIÓN ACTIVA
    this.userService.getUserDetail().subscribe(data => {
      this.detailsUser = data;
      console.log(this.detailsUser);
      this.getReferNutritionFacts();
    });
    //ITERA SOBRE LOS DATOS OBTENIDOS DESDE LA PLANIFICACION
    //OBTIENE LOS DATOS DE LA INFORMACION NUTRICIONAL
    for (let dataEvents of this.events) {
      console.log(dataEvents);
      //ARREGLO DE TODAS LAS CALORIAS 
      this.calories.push(dataEvents.calories);
      //ARREGLO DE TODAS LAS GRASAS
      this.fat.push(dataEvents.fat);
      //ARREGLO DE TODAS LAS Proteínas
      this.protein.push(dataEvents.protein)

    }
    //ITERA SOBRE EL ARREGLO DE CALORIAS
    for (let datacalories of this.calories) {
      this.sumCalories = this.sumCalories + datacalories;
    }
    console.log('Suma Calorias', this.sumCalories);
    this.dayCalories = this.sumCalories / 7;
    this.refDayCalories= parseInt(this.dayCalories.toString());

    console.log('Promedio por día Calorias', parseInt(this.dayCalories.toString()));

    //ITERA SOBRE EL ARREGLO DE GRASAS
    for (let dataFat of this.fat) {
      this.sumFat = this.sumFat + dataFat;
    }
    console.log('Suma Grasas', this.sumFat);
    this.averageFat = this.sumFat / 7;
    this.dayGramsFat = (this.averageFat * 0.25) / 9;
    this.refDayFat=parseInt(this.dayGramsFat.toString())
    console.log('Gramos de Grasas por dia',this.refDayFat );
    for (let dataProtein of this.protein) {
      this.sumProtein = this.sumProtein + dataProtein;
    }
    console.log('Suma Proteínas', this.sumProtein);
    this.averageProtein = this.sumProtein / 7;
    this.dayGramsProtein = (this.averageProtein * 0.10) / 4;
    this.refDayProtein=parseInt(this.dayGramsProtein.toString());
    console.log('Gramos de proteína por dia', this.refDayProtein);

    //CREACION DEL GRAFICO ESTADISTICO 
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Calorias', 'Grasas', 'Proteína'],
        datasets: [{
          label: 'Datos',
          data: [this.refDayCalories, this.refDayFat, this.refDayProtein],
          backgroundColor: 'rgb(173, 255, 47)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(173, 255, 47)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });



  }

  closeModal() {
    this.viewCtrl.dismiss();

  }
 

  getReferNutritionFacts() {
    var birth = moment(this.detailsUser.dateBirth, 'YYYY-MM-DD');
    let edad = parseInt(birth.fromNow());
    console.log('edad',edad);
    console.log('sexo',this.detailsUser.gender);
    
    if (this.detailsUser.gender == 'femenino') {
      this.basalRate = 655 + (9.6 * this.detailsUser.weight) + (1.8 * this.detailsUser.height) - (4.7 * edad);
      console.log('Rango basal',parseInt(this.basalRate.toString()));

    } else {
      this.basalRate= 66 + (13.7 * this.detailsUser.weight) + (5 * this.detailsUser.height) - (6.8 * edad);
      console.log('Rango basal',parseInt(this.basalRate.toString()));

    }
    //calorias 
    if (this.detailsUser.dailyActivities == 'sedentario') {
      this.caloriesRef = parseInt(this.basalRate.toString()) * 1.2;
      console.log('calorias', this.caloriesRef);

    } else if (this.detailsUser.dailyActivities == 'poco activo') {
      this.caloriesRef = parseInt(this.basalRate.toString()) * 1.375;
      console.log('calorias', this.caloriesRef);

    } else if (this.detailsUser.dailyActivities == 'activo') {
      this.caloriesRef = parseInt(this.basalRate.toString()) * 1.55;
      console.log('calorias', this.caloriesRef);

    } else if (this.detailsUser.dailyActivities == 'muy activo') {
      this.caloriesRef = parseInt(this.basalRate.toString()) * 1.725;
      console.log('calorias', this.caloriesRef);

    } else {
      this.caloriesRef = parseInt(this.basalRate.toString()) * 1.9;
      console.log('calorias', this.caloriesRef);

    }
    console.log('caloriasimprimir',parseInt(this.caloriesRef.toString()));
    console.log('basalRateinfo', parseInt(this.basalRate.toString()));
    
    
    //grasas
    this.fatRef = (parseInt(this.caloriesRef.toString()) * 0.25) / 9;
    console.log('grasas', this.fatRef);

    //Proteínas
    this.proteinRef = (parseInt(this.caloriesRef.toString()) * 0.10) / 4;
    console.log('proteínaRef', this.proteinRef);
    //comparacion con los valores de referencia  de calorias 
    if (parseInt(this.dayCalories.toString()) > parseInt(this.caloriesRef.toString())) {
      this.messageCalories = 'Este consumo diario de calorias esta superando lo adecuado para mantener tu peso actual';
    } else if (this.dayCalories < parseInt(this.caloriesRef.toString())) {
      this.messageCalories = 'Este consumo diario de calorias es menor a lo recomendado para mantener tu peso actual';
    } else {
      this.messageCalories = 'Este consumo diario de calorias el adecuado para mantenerte de forma sana y sostenible';
    }
    //comparacion con los valores de referencia  de calorias 
    if (parseInt(this.dayGramsFat.toString())> parseInt(this.fatRef.toString())) {
      this.messageFat = 'Este consumo diario de gramos de grasa esta superando lo adecuado para mantener tu peso actual';
    } else if (this.dayGramsFat < parseInt(this.fatRef.toString())) {
      this.messageFat = 'Este consumo diario de gramos de grasa es menor a lo recomendado para mantener tu peso actual';
    } else {
      this.messageFat = 'Este consumo diario de gramos de grasa es el adecuado para mantenerte de forma sana y sostenible';
    }
    //comparacion con los valores de referencia  de calorias 
    if (parseInt(this.dayGramsProtein.toString()) > parseInt(this.proteinRef.toString())) {
      this.messageProtein = 'Este consumo diario de gramos de proteína esta superando lo adecuado para mantener tu peso actual';
    } else if (this.dayGramsProtein <  parseInt(this.proteinRef.toString())) {
      this.messageProtein = 'Este consumo diario de gramos de proteína es menor a lo recomendado para mantener tu peso actual';
    } else {
      this.messageProtein = 'Este consumo diario de gramos de proteína es el adecuado para mantenerte de forma sana y sostenible';
    }

  }
  


}
