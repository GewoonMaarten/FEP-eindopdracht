import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { Materiaal } from "./models/materiaal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router) {

  }

  ngOnInit(){
  }

}
