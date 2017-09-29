import { Component } from '@angular/core';
import {MdDialog} from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


import { MaterialenLijstComponent } from './components/materialen-lijst/materialen-lijst.component';
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

  constructor(db: AngularFireDatabase, public dialog: MdDialog) {
    this.items = db.list('/materialen');
  }

  public openLogin(): void{
    let dialogRef = this.dialog.open(LoginComponent/*Logincomponent*/, {
      width: '250px',
    });
  }
}
