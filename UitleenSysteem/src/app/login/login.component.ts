import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: Observable<firebase.User>;
  loginError: boolean;

  constructor(public afAuth: AngularFireAuth, 
    public dialogRef: MdDialogRef<LoginComponent>) {
    this.user = afAuth.authState;
    this.loginError = false;
  }

  // admin@admin.nl test123 werkt altijd voor login
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch((error) => {
      // var errorCode = error.name;
      // var errorMessage = error.message;
      this.loginError = true;
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}