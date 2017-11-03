import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

import {User} from "../models/user";

import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

  //private user: User;
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
    // haal de authstate op en gebruik het id om een user op te halen
    // uit de realtime database.

    this.afAuth.authState
      .switchMap(auth => {
        if (auth) {
          return this.db.object<User>('users/' + auth.uid)
            .valueChanges();
        } else {
          return Observable.of(null);
        }
      })
      .subscribe(user => {
        console.log("AuthService: ", user);

        this.user.next(<User> user);

      });

  }
  /**
   * login function
   * @param {string} email
   * @param {string} password
   * */
  login(email: string, password: string) {

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/materiaal/1']);
      })
      .catch(error => console.log(error));
  }

  /** Signout */
  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
