import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then(
        (m) => m.WelcomeModule
      ),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./top/top.module').then(
        (m) => m.TopModule
      ),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
