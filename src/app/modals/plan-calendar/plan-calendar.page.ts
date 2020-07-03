import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-plan-calendar',
  templateUrl: './plan-calendar.page.html',
  styleUrls: ['./plan-calendar.page.scss'],
})
export class PlanCalendarPage implements OnInit {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  detail: any;

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay,
  };
  selectedDate = new Date();

  constructor(public viewCtrl: ModalController, public userService: UserService, navParams: NavParams) {
    this.detail = navParams.get('detailRecipe')
    console.log(this.detail);

  }

  addEvent() {
    let date = this.selectedDate;
    let event = {
      dateTime: date,
      recipe: this.detail


    }
    this.userService.createPlan(event)
      .then(() => {
        console.log('plan agregado');

      }
      ).catch((error) => {
        console.log('error', error);

      })

  }
  dismiss() {
    this.viewCtrl.dismiss(this.detail);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }


  ngOnInit() {
  }


}
