import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import validator from 'validator';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.page.html',
  styleUrls: ['./cuestionario.page.scss'],
})
export class CuestionarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cuestionarioForm =new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    apodo: new FormControl(''),
    altura: new FormControl(''),
    peso: new FormControl(''),
  });

  cuestionarioFormValidator={
    nombre:{
      empty:'',
    },
    apellido:{
      empty:'',
    },
    apodo:{
      empty:'',
    },
    altura:{
      empty:'',
    },
    peso:{
      empty:'',
    },

  };

  formValidator(): boolean{
    if (validator.isEmpty(this.cuestionarioForm.value.nombre)) {
      this.cuestionarioFormValidator.nombre.empty = 'El nombre es requerido';
      return false;
      } else {
      this.cuestionarioFormValidator.nombre.empty = '';
      }
      if (validator.isEmpty(this.cuestionarioForm.value.apellido)) {
        this.cuestionarioFormValidator.apellido.empty = 'El apellido es requerido';
        return false;
        } else {
        this.cuestionarioFormValidator.apellido.empty = '';
        }
        if (validator.isEmpty(this.cuestionarioForm.value.apodo)) {
          this.cuestionarioFormValidator.apodo.empty = 'El apodo es requerido';
          return false;
          } else {
          this.cuestionarioFormValidator.apodo.empty = '';
          }
          if (validator.isEmpty(this.cuestionarioForm.value.altura)) {
            this.cuestionarioFormValidator.altura.empty = 'El altura es requerido';
            return false;
            } else {
            this.cuestionarioFormValidator.altura.empty = '';
            }
            if (validator.isEmpty(this.cuestionarioForm.value.peso)) {
              this.cuestionarioFormValidator.peso.empty = 'El peso es requerido';
              return false;
              } else {
              this.cuestionarioFormValidator.peso.empty = '';
              }
              return true;
  }
  onSubmit() {
    if (this.formValidator()) {
    console.log('Formulario Validado');
    }
  }



}
