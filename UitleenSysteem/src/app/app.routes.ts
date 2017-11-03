import { Routes } from '@angular/router';

import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';
import { LoginComponent } from './components/login/login.component';
import { MateriaalFormComponent } from './components/materiaal-form/materiaal-form.component';

import {AuthGuard} from "./guards/auth.guard";
import {DocentGuard} from "./guards/docent.guard";
import { BeheerderGuard } from "./guards/beheerder.guard"


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'materiaal/form',
    component: MateriaalFormComponent,
    canActivate: [AuthGuard, BeheerderGuard]
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
