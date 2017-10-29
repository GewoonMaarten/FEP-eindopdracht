import { Routes } from '@angular/router';

import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';
import { LoginComponent } from './components/login/login.component';
import { ReserveringAfhandelenComponent } from './components/reservering-afhandelen/reservering-afhandelen.component';

import {AuthGuard} from "./guards/auth.guard";
import {DocentGuard} from "./guards/docent.guard";

export const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: 'login'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'materiaal/:page',
    component: MaterialenLijstComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservering/afhandelen',
    component: ReserveringAfhandelenComponent,
    //canActivate: [AuthGuard]
  }
];
