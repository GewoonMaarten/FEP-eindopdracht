import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';

import { routes } from "./app.routes";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { MaterialenService } from './services/materialen.service';
import { ReserveringService } from './services/reservering.service';
import { AuthService } from './services/auth.service';
import { NavbarService } from './services/navbar.service';
import { KluisjesService } from './services/kluisjes.service';
import { UserService } from './services/user.service';

import { AuthGuard } from "./guards/auth.guard";
import { DocentGuard } from "./guards/docent.guard";
import { BeheerderGuard } from "./guards/beheerder.guard";

//Angular material components
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule
} from '@angular/material';
import { Ng2DropdownModule } from 'ng2-material-dropdown';

import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { ReserveringLijstComponent } from './components/reservering-lijst/reservering-lijst.component';
import { ReserveringFormComponent } from './components/reservering-form/reservering-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialenLijstComponent,
    LoginComponent,
    NavbarComponent,
    CartComponent,
    ReserveringLijstComponent,
    ReserveringFormComponent
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
    FormsModule,
    ReactiveFormsModule,
    //Angular material components
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule
  ],
  entryComponents: [
    LoginComponent,
    CartComponent
  ],
  providers: [
    MaterialenService,
    ReserveringService,
    AuthService,
    NavbarService,
    KluisjesService,
    UserService,
    AngularFireAuth,
    AuthGuard,
    DocentGuard,
    BeheerderGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
