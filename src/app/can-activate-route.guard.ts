import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private routerService: RouterService, private authService: AuthenticationService) {}

  ngOnInit() {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isUserAuthenticated(this.authService.getBearerToken())
    .then(data => {
      if(!data){
        this.routerService.routeToLogin();
      }
      return data;
    })
  }
}
