import { Component, OnInit, ViewChild,LOCALE_ID, Inject} from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ModalController } from '@ionic/angular';
import { StatisticsPage } from 'src/app/modals/statistics/statistics.page';
import { CommonService } from '../../services/common.service';
import { DetailPlanningPage } from 'src/app/modals/detail-planning/detail-planning.page';
import * as moment from 'moment';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  eventSource = [];
  viewTitle: string;
  detail: any;
  eventsSend: any = [];
  selectedDate = new Date();
  queryEvents = '';
  startTime = moment().startOf('week');
  endTime = moment().endOf('week');

  calendar = {
    mode: 'week',
    currentDate: new Date(),
    
  };

  markDisabled = (date: moment.Moment) => {

    var today = moment(new Date());
    today.toDate();
    var tomorrow = moment(new Date()).add(15, 'days');
    tomorrow.toDate();

    return today > date || date > tomorrow

  };
  @ViewChild(CalendarComponent, { static: true }) myCalendar: CalendarComponent;

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public modalController: ModalController,
    public commonService: CommonService,
    @Inject(LOCALE_ID) private locale: string) 
    {
     
    let event: any;
    this.userService.getPlan().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        event = snap.payload.doc.data();//devuelve los datos
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        event.recipe = event.title;
        event.calories = event.title.nutritionFacts.calories;
        event.fat = event.title.nutritionFacts.fat;
        event.protein = event.title.nutritionFacts.protein;
        event.title = event.title.name;
        event.allDay = event.allDay;
        console.log(event);
        this.eventSource.push(event);
        this.myCalendar.loadEvents();
      });
    });
    
  
  }

  async openModalStatistics() {

    this.commonService.presentLoading();
    const modal = await this.modalController.create({
      component: StatisticsPage,
      cssClass: 'modal-statistics',
      backdropDismiss: false,
      componentProps: {
        events: this.eventSource.filter((event) => {
          return moment(event.startTime).isSameOrAfter(this.startTime) && moment(event.startTime).isSameOrBefore(this.endTime)
        }),
        
      }
    });
    await modal.present();

  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title
  }

  async onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    this.commonService.presentLoading();
    const modal = await this.modalController.create({
      component: DetailPlanningPage,
      cssClass: 'modal-detailEvent',
      backdropDismiss: false,
      componentProps: { eventsDetail: event }
    });
    await modal.present();

  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
    this.queryEvents = ev.events;
  }


  onCurrentDateChanged(currentDate: Date) {
    this.startTime = moment(currentDate).startOf('isoWeek');
    this.endTime = moment(currentDate).endOf('isoWeek');
    console.log('current date change: ' + currentDate);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  ngOnInit() {

  }



}




