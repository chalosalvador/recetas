import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { NavParams } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-plan-calendar',
  templateUrl: './plan-calendar.page.html',
  styleUrls: ['./plan-calendar.page.scss'],
})
export class PlanCalendarPage implements OnInit {

  eventSource = [];
  viewTitle: string;
  detail: any;
  recipeEvent:any= [];
  eventInfo:any;
  dataPlan:any;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  
  markDisabled = (date:moment.Moment) => {
  
    var today =moment(new Date());
    today.toDate();
    var tomorrow=moment(new Date()).add(15,'days');
    tomorrow.toDate();
    
    return today>date||date>tomorrow
 
};

  selectedDate = new Date();
  queryEvents='';
  modalReady=false;
  selectedDisabled=false;
  @ViewChild(CalendarComponent,{static:false}) myCalendar: CalendarComponent
  showEventDetail: boolean;
  date:any;
  constructor(public viewCtrl: ModalController, public userService: UserService, 
    navParams: NavParams, public commonService: CommonService,private router: Router,
    public navCtrl: NavController) {
    
    this.detail = navParams.get('detailRecipe');
    console.log(this.detail)

    this.loadEvent();
    this.date=moment();
    console.log(this.date);
    
   

  }
    
  addEvent() {
    this.commonService.presentLoading();
    
    let dateSelected = this.selectedDate;
    let endateSelected = this.selectedDate;
    let event = {
      title:this.detail,
      startTime:endateSelected,
      endTime:dateSelected,
      allDay:true
    };
  setTimeout(()=>{
  if(!this.selectedDisabled){
     
    if(this.queryEvents.length==1){

     this.commonService.presentAlertConfirm(
       'Planifición',
       'Ya existe una receta Desea Cambiarla' ,
       [
         {
           text:'Cancel',
           role:'cancel',
           handler:(blah)=>{
             this.loadEvent();
           }
         }, {
           text:'Ok',
           handler:async()=>{
             try{
              this.userService.updatePlan(this.dataPlan.id,event)
              .then(() => {
                this.commonService.presentAlert( 'Planificación', 'Tu receta ha sido actualizada con exito' );
                this.viewCtrl.dismiss();
                this.navCtrl.pop();
                console.log('plan actualizado');
        
              }
              ).catch((error) => {
                this.commonService.presentAlert( 'Planificación', 'No fue posible actualizar tu receta' );
                console.log('error', error);
        
              })

             }catch(error){
                this.commonService.presentAlert(error.message)
             }
           }
         }
       ]
     )
  }else{
    this.userService.createPlan(event)
      .then(() => {
        this.commonService.presentAlert( 'Planificación', 'Tu receta ha sido añadida con exito' );
        this.viewCtrl.dismiss();
        this.navCtrl.pop();
        console.log('plan agregado');

      }
      ).catch((error) => {
        this.commonService.presentAlert( 'Planificación', 'No fue posible agregar tu receta' );
        console.log('error', error);

      })

  }
}else{
  this.commonService.presentAlert('Error', 'No es posible agregar recetas, intente en un día habilitado');
  
}
},2200);
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
 

  onViewTitleChanged(title) {
    this.viewTitle = title
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    this.eventInfo=event.id
    console.log(this.eventInfo);  
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
    this.queryEvents=ev.events;
    this.selectedDisabled=ev.disabled
    for(let eventData of this.queryEvents){
      this.dataPlan=eventData
      console.log(this.dataPlan);
      
    }
  }
  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
    
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  loadEvent(){
    this.userService.getPlan().subscribe(colSnap=>{
      this.eventSource=[];
      colSnap.forEach(snap=>{
         let event:any = snap.payload.doc.data();//devuelve los datos
          event.id=snap.payload.doc.id;
          event.startTime=event.startTime.toDate();
          event.endTime=event.endTime.toDate();
          event.title=event.title.name;
          event.allDay=event.allDay;
          console.log(event);
          this.eventSource.push(event);
          this.myCalendar.loadEvents();
      });
      this.myCalendar.loadEvents();
    });
  }


  ngOnInit() {
    setTimeout(()=>{
      this.modalReady=true;
    },0);
  }


}
