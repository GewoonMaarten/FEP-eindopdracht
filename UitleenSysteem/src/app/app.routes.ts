import { Routes } from '@angular/router';

import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';
import { LoginComponent } from './components/login/login.component';
import { MateriaalFormComponent } from './components/materiaal-form/materiaal-form.component';
import { AddToCatalogusComponent } from './components/catalogus/add-to-catalogus/add-to-catalogus.component';
import { AddToCatalogusFormComponent } from './components/catalogus/add-to-catalogus-form/add-to-catalogus-form.component';
import { CatalogusListComponent } from './components/catalogus/catalogus-list/catalogus-list.component';
import { ReserveringLijstComponent } from './components/reservering-lijst/reservering-lijst.component';
import { ReserveringFormComponent } from './components/reservering-form/reservering-form.component';

import {AuthGuard} from './guards/auth.guard';
import {DocentGuard} from './guards/docent.guard';
import { BeheerderGuard } from './guards/beheerder.guard';

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
  {
    path: 'reservering',
    component: ReserveringLijstComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservering/afhandelen/:key',
    component: ReserveringFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'materiaal/catalogus/:page',
    component: CatalogusListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'toevoegen-aan-catalogus',
    component: AddToCatalogusComponent,
    canActivate: [AuthGuard, BeheerderGuard]
  },
  {
    path: 'toevoegen-aan-catalogus-formulier',
    component: AddToCatalogusFormComponent,
    canActivate: [AuthGuard, BeheerderGuard]
  },

  /* Moet onderaan blijven */
  {
    path: '**',
    redirectTo: 'login'
  },

];
