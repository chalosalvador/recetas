import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  //DECLARACION DE VARIABLES
  validations_form: FormGroup;
  subscription: any;
  backButtonSubscription; 
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor( private platform:Platform, private authService: AuthService, public commonService: CommonService, private formBuilder: FormBuilder,public router: Router) {
    // this.subscription=this.platform.backButton.subscribeWithPriority(666666,()=>{
    //   if(this.constructor.name=="LoginPage"){
    //     if(window.confirm("Desea salir de la app")){
    //       navigator["app"].exitApp();
    //     }
    //   }
    // });
    //this.backButtonEvent();
   }

  ngOnInit() {
    this.resetFields();
   // this.backButtonEvent();
  }
  
  // backButtonEvent() {
  //   document.addEventListener("backbutton", () => {
  //     this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
  //       if (outlet && outlet.canGoBack()) {
  //         outlet.pop(); // work for ionic 4
  //       } else if (!outlet.canGoBack()) {
  //           navigator['app'].exitApp();
  //       }
  //     });
  //   });
  // }

  

  async doLogin(dataForm) {
    try {
      this.commonService.presentLoading();
      await this.authService.login(dataForm.email);
      setTimeout(() => {
        this.commonService.presentAlert('Inicio de sesión', 'Te hemos enviado un correo, revisa tu bandeja de entrada.¡Recuerda revisar tus correos no deseados!');
      },2000); 
      setTimeout(() => {
        this.router.navigate(['/loading'])
      },4000); 
      
    } catch (e) {
      console.error(e);
      await this.commonService.presentAlert('Error', 'No se pudo enviar el correo electrónico de inicio de sesión.');
      // this.errorMessage = e.message;
    }
  }
  resetFields() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]))
    })
  }
  

}
