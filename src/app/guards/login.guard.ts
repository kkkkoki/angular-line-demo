import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { RedirectService } from '../services/redirect.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  check$ = this.authService.afAuth.user.pipe(
    map((user) => !user),
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        this.redirectService.redirectToTop();
      }
    })
  );

  constructor(private authService: AuthService, private redirectService: RedirectService) { }

  canActivate(): Observable<boolean> {
    return this.check$;
  }
  canLoad(): Observable<boolean> {
    return this.check$.pipe(take(1));
  }
}
