import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Validators, FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { async } from '@angular/core/testing';
import { __await } from 'tslib';

@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.page.html',
  styleUrls: ['./health-info.page.scss'],
})
export class HealthInfoPage implements OnInit {
  nom:string;
  
  problems=[
    {name:"Anemia", isChecked: false},
    {name:"Colesterol", isChecked: false},
    {name:"Problemas Cardiacos", isChecked: false},
    {name:"Presion Alta", isChecked: false},
    {name:"Diabetes", isChecked: false},
    {name:"Ninguno", isChecked: false},
  ];
  

  constructor(
    public userService : UserService, 
    public router: Router,
    private commonService: CommonService,
    ) { 

  }

   ngOnInit() {
     
   }
 
   
   onClick(problem){
     console.log(problem);
     if(problem.isChecked){
       this.nom=problem.name;
       console.log(this.nom);
     }
    }
   save(value){
    console.log(this.problems);
    const userProblems=[];
    if (this.problems.filter(problem=>problem.isChecked==true).length>0){
      this.problems.forEach((problem)=>{
        if(problem.isChecked){
          userProblems.push(problem.name);
          console.log(userProblems)
        }
        
      })
    this.userService.AddData(userProblems)
    .then(
      async res=>{
        await this.commonService.presentAlert( 'Problemas salud', '', 'Registro Exitoso.' );
        this.router.navigate(['/home/tabs/tab1'])
      }
    
    )
      
      }else{
        alert('Seleccione al menos un problema')
     
  }
  }

}
