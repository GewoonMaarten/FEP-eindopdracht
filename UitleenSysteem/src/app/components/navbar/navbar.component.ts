import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../../services/navbar.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Subject<User> = new Subject();

  constructor(public nav: NavbarService, public auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.user
  }

  public logout(): void {
    this.auth.signOut();
  }
}
