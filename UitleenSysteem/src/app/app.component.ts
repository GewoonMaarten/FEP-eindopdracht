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
  // title = 'app';
  // items: FirebaseListObservable<Materiaal[]>;
  //
  // isLogin: boolean = true;
  //
  // images : boolean = true;
  // user: any;

  constructor(db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router) {
    // this.items = db.list('/materialen');
    // this.afAuth.authState.subscribe((auth) => {
    //   if (auth != null) {
    //     this.user = auth;
    //   }
    // });
  }

  ngOnInit(){
    // if(this.router.url == '/login'){
    //   this.isLogin = true;
    // }
  }
  //
  //
  // openDialog(): void {
  //   let dialogRef = this.dialog.open(LoginComponent, {
  //     width: '40%'
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
  // logout() {
  //   this.afAuth.auth.signOut();
  //   this.user = undefined;
  // }
}
