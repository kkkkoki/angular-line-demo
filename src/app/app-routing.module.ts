import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then(
        (m) => m.WelcomeModule
      )
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./top/top.module').then(
        (m) => m.TopModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
