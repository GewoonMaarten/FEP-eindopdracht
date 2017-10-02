import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { routes } from "./app.routes";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { MaterialenService } from './services/materialen.service';

//Angular material components
import {
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule,
  MatInputModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTabsModule
} from '@angular/material';


import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';
import { LoginComponent } from "./components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    MaterialenLijstComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    //Angular material components
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [
    MaterialenService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
