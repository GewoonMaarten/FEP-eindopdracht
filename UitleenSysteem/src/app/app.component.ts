import { Component } from '@angular/core';
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

  constructor(db: AngularFireDatabase) {
    this.items = db.list('/materialen');
  }
}
