import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: Observable<firebase.User>;
  loginError: boolean;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.loginError = false;
  }

  // admin@admin.nl test123 werkt altijd voor login
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.afAuth.authState.subscribe((auth) => auth == null ? this.loginError = true : this.loginError = false);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}