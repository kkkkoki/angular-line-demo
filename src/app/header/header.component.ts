import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RedirectService } from '../services/redirect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private redirectService: RedirectService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.redirectService.redirectToTop();
      } else {
        this.ngOnInit();
      }
    });
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.authService.user$.subscribe((user) => {
      if (!user) {
        this.redirectService.redirectToWelcome();
      } else {
        this.ngOnInit();
      }
    });
  }
}
