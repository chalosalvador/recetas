import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuardGuard implements CanActivate {
  constructor(
    private AFauthO: AngularFireAuth,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AFauthO.authState.pipe(map(auth => {
        if (isNullOrUndefined(auth)) {
          return true;
        } else {
          this.router.navigate(['tabs/tab1']);//comprueba el estado y redirige al menú 
          return false;
        }
      }
      ));
    return true;
  }
  
}
