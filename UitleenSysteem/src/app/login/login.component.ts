import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'login',
  template: `
  <div> {{ (user | async)?.uid }} </div>
  <button (click)="login('admin@admin.nl', 'test123')">Login</button>
  <button (click)="logout()">Logout</button>
  `,
})
export class LoginComponent {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}