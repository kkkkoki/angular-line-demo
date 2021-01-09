import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.authService.user$.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/');
      } else {
        this.ngOnInit();
      }
    });
  }
}
