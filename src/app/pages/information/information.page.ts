import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component( {
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: [ './information.page.scss' ]
} )
export class InformationPage implements OnInit {
  //dateBirth: String = new Date().toISOString();
  validations_form  :FormGroup;
  //dateBirth=new Date().toISOString();

  constructor(public userService : UserService, public router: Router,  private formBuilder: FormBuilder,
    private commonService: CommonService) {
      
  }

  ngOnInit() {
    this.limpiarCampos();
  
  }
  onSubmit(value){
    let data={
        name: value.name,
        lastname: value.lastname,
        nickname: value.nickname,
        dateBirth:value.dateBirth,
        height:value.height,
        weight:value.weight,
        gender:value.gender
    }
    this.userService.createUser(data)
    .then(
      async res=>{
        await this.commonService.presentAlert( 'Cuestionario', '', 'Registro Exitoso.' );
        this.router.navigate(['/health-info'])
      }
    )
  }

  limpiarCampos(){
    
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      nickname: new FormControl('', Validators.required),
      dateBirth: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      
      
    });
  }
  
}
  