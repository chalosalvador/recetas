import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service'
import { RecipesService } from '../services/recipes.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  
  constructor(
    
    private authService: AuthService, 
    public commonService: CommonService, 
    public userService: UserService,
    public recipesService: RecipesService,
    public router: Router,) {
    
  }

 

}