import { ModuleWithProviders }  from '@angular/core';
import { Routes } from '@angular/router';

import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: '/materiaal/1',
        pathMatch: 'full'
    }, { 
        path: 'materiaal/:page', 
        component: MaterialenLijstComponent },
];
