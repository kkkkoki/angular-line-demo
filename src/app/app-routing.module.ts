import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./top/top.module').then(
        (m) => m.TopModule
      )
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then(
        (m) => m.WelcomeModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
