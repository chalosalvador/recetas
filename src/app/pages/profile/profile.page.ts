import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  details: any = {};
  id: any;
  constructor(
    
    private route: ActivatedRoute, 
    private router: Router,
    public userService: UserService) {

    this.id = route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.userService.getUserDetail(this.id).subscribe(data => {
      this.details = data;
      console.log(this.details);

    })
  }

  ngOnInit() {

  }


}
