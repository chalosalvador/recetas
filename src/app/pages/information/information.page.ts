import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss']
})
export class InformationPage implements OnInit {
  //DECLARACION DE VARIABLES
  validations_form: FormGroup;
  isSave: boolean = false;

  constructor(public userService: UserService, public router: Router, private formBuilder: FormBuilder,
    private commonService: CommonService) {

  }

  ngOnInit() {
    this.resetFields();

  }
  //FUNCION PARA ENVIAR LOS DATOS A FIREBASE 
  onSubmit(value) {
    this.isSave = true;
    let data = {//declaracion de los datos que se obtiene de los inputs
      name: value.name,
      lastname: value.lastname,
      nickname: value.nickname,
      dateBirth: value.dateBirth,
      height: value.height,
      weight: value.weight,
      gender: value.gender,
      dailyActivities:value.dailyActivities
    }
   
    this.userService.createUser(data)//llama a la funcion crear usuario desde user.service.ts
      .then(() => {
        this.isSave = false;
         this.commonService.presentLoading();
          this.router.navigate(['/tabs/tab1'])//Navegacion al inicio de página
          
        }
      ).catch((error)=>{
        console.log('error', error);
        this.isSave = false;
      })
  }
  
//FUNCION PARA LIMPIAR LOS CAMPOS 
  resetFields() {

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25),Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern('^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$')]),
      dateBirth: new FormControl('', Validators.required),
      height: new FormControl('',[Validators.required,Validators.max(220), Validators.min(90)]),
      weight: new FormControl('', [Validators.required,Validators.max(200), Validators.min(30)]),
      gender: new FormControl('', Validators.required),
      dailyActivities:new FormControl('', Validators.required)


    });
  }

}
