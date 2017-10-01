import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
    BrowserAnimationsModule,
    InfiniteScrollModule,
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
