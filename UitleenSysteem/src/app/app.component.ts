import { Component } from '@angular/core';
import {MdDialog} from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';
import { LoginComponent } from './components/login/login.component';
import { Materiaal } from "./models/materiaal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items: FirebaseListObservable<Materiaal[]>;
  
  images : boolean = true;
  user: any;

  constructor(db: AngularFireDatabase, public dialog: MdDialog,public afAuth: AngularFireAuth) {
    this.items = db.list('/materialen');
    this.afAuth.authState.subscribe((auth) => {
      if (auth != null) {
        this.user = auth;
      }      
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  logout() {
    this.afAuth.auth.signOut();
    this.user = undefined;
  }
}
