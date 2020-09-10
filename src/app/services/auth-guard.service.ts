import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isLoggedIn: boolean;

  constructor(private router: Router,private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    this.authService.authState().subscribe(user=>{
      if (!user) {
        this.isLoggedIn = false;
        this.router.navigate(["login"]);
        return false;
      }
      
    });
    return true;

    
  }
}
