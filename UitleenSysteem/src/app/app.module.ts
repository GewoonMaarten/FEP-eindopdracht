import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
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
  MatCardModule,
  MatProgressBarModule,
  MatDialogModule
} from '@angular/material';


import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialenLijstComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    //Angular material components
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [
    MaterialenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
