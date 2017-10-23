import { Routes } from '@angular/router';

import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard} from "./guards/auth.guard";
import {DocentGuard} from "./guards/docent.guard";


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'materiaal/:page',
    component: MaterialenLijstComponent,
    canActivate: [AuthGuard]
  },
  /* Moet onderaan blijven */
  {
    path: '**',
    redirectTo: 'login'
  },
];
