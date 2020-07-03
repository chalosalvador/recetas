import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(public navCtrl: NavController,
    public userService: UserService) { }

  ngOnInit() {
    this.getPlanDetail();
  }
  getPlanDetail() {
    this.userService.getPlan().subscribe(data => {
      console.log(data);

    })
  }


}




