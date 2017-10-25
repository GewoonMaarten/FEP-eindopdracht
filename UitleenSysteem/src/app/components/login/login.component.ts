import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {AuthService} from "../../services/auth.service";
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  loginError: boolean;

  loginForm: FormGroup;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;


  constructor(public afAuth: AngularFireAuth,
              private fb: FormBuilder,
              private authService: AuthService,
              private nav: NavbarService) {}

  ngOnInit(): void {
    this.nav.hide();

    this.user = this.afAuth.authState;
    this.loginError = false;

    this.emailFormControl = new FormControl('', [
      Validators.required]);

    this.passwordFormControl = new FormControl('', [
      Validators.required]);


    this.loginForm = new FormGroup({});
    this.loginForm.addControl('email', this.emailFormControl);
    this.loginForm.addControl('password', this.passwordFormControl);
  }

  onSubmit(value:string): void{
    const formModel = this.loginForm.value;

    this.authService.login(formModel.email, formModel.password);
  }
}
