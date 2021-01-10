import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) { }

  redirectToTop(): void {
    this.router.navigateByUrl('/');
  }

  redirectToWelcome(): void {
    this.router.navigateByUrl('/welcome');
  }
}
