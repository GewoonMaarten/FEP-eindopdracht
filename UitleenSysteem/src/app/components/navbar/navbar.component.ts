import { Component, OnInit, ViewChildren, Output, EventEmitter } from '@angular/core';
import {NavbarService} from "../../services/navbar.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {Materiaal} from "../../models/materiaal";
import {Subject} from "rxjs/Subject";
import { Subscription } from 'rxjs/Subscription';
import {MaterialenLijstComponent} from "../materialen-lijst/materialen-lijst.component";
import {MatDialog} from '@angular/material';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  subscription: Subscription;
  cart: Materiaal [];
  user: Subject<User> = new Subject();

  constructor(public nav: NavbarService, public dialog: MatDialog, public auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.user;
  }

  public logout(): void {
    this.auth.signOut();
  }

  showCart() {

    let dialogRef = this.dialog.open(CartComponent, {
            width: '40%'
           });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    // this.visibleCart = true;
    // console.log(this.cart);
  }

  showReserveringen() {
    console.log("reserveringen")
  }
}
